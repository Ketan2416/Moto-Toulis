export interface ShopStatus {
  isOpen: boolean;
  statusTextEn: string;
  statusTextEl: string;
  nextOpenEn: string;
  nextOpenEl: string;
}

export function getShopStatus(): ShopStatus {
  try {
    // Current time in Cyprus (Europe/Nicosia)
    const now = new Date();
    const cyprusTimeString = now.toLocaleString('en-US', { timeZone: 'Europe/Nicosia' });
    const cyprusDate = new Date(cyprusTimeString);

    const day = cyprusDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const hours = cyprusDate.getHours();
    const minutes = cyprusDate.getMinutes();
    const timeVal = hours * 60 + minutes;

    // Schedule:
    // Mon-Fri (1-5): 08:00 - 18:30 (480 - 1110)
    // Saturday (6): 08:00 - 16:00 (480 - 960)
    // Sunday (0): Closed

    if (day >= 1 && day <= 5) {
      if (timeVal >= 480 && timeVal < 1110) {
        return {
          isOpen: true,
          statusTextEn: 'Open today until 18:30 (Cyprus Time)',
          statusTextEl: 'Ανοιχτά σήμερα έως τις 18:30',
          nextOpenEn: '',
          nextOpenEl: '',
        };
      } else if (timeVal < 480) {
        return {
          isOpen: false,
          statusTextEn: 'Closed now',
          statusTextEl: 'Κλειστά τώρα',
          nextOpenEn: 'Opens today at 08:00',
          nextOpenEl: 'Ανοίγει σήμερα στις 08:00',
        };
      } else {
        const nextDayTextEn = day === 5 ? 'Opens Saturday at 08:00' : 'Opens tomorrow at 08:00';
        const nextDayTextEl = day === 5 ? 'Ανοίγει Σάββατο στις 08:00' : 'Ανοίγει αύριο στις 08:00';
        return {
          isOpen: false,
          statusTextEn: 'Closed for the day',
          statusTextEl: 'Κλειστά για σήμερα',
          nextOpenEn: nextDayTextEn,
          nextOpenEl: nextDayTextEl,
        };
      }
    } else if (day === 6) {
      // Saturday
      if (timeVal >= 480 && timeVal < 960) {
        return {
          isOpen: true,
          statusTextEn: 'Open today until 16:00 (Cyprus Time)',
          statusTextEl: 'Ανοιχτά σήμερα έως τις 16:00',
          nextOpenEn: '',
          nextOpenEl: '',
        };
      } else if (timeVal < 480) {
        return {
          isOpen: false,
          statusTextEn: 'Closed now',
          statusTextEl: 'Κλειστά τώρα',
          nextOpenEn: 'Opens today at 08:00',
          nextOpenEl: 'Ανοίγει σήμερα στις 08:00',
        };
      } else {
        return {
          isOpen: false,
          statusTextEn: 'Closed for the weekend',
          statusTextEl: 'Κλειστά για το Σαββατοκύριακο',
          nextOpenEn: 'Opens Monday at 08:00',
          nextOpenEl: 'Ανοίγει Δευτέρα στις 08:00',
        };
      }
    } else {
      // Sunday
      return {
        isOpen: false,
        statusTextEn: 'Closed on Sunday',
        statusTextEl: 'Κλειστά την Κυριακή',
        nextOpenEn: 'Opens Monday at 08:00',
        nextOpenEl: 'Ανοίγει Δευτέρα στις 08:00',
      };
    }
  } catch {
    return {
      isOpen: false,
      statusTextEn: 'Mon–Fri: 08:00–18:30 · Sat: 08:00–16:00',
      statusTextEl: 'Δευ–Παρ: 08:00–18:30 · Σαβ: 08:00–16:00',
      nextOpenEn: '',
      nextOpenEl: '',
    };
  }
}
