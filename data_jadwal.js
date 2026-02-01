const scheduleData = [
    // ================= SENIN =================
    // R.Coding
    { day: "Senin", start: 1, duration: 4, room: "R.Coding", teacher: "Eko S", subject: "GIM", color: "orange" },
    { day: "Senin", start: 5, duration: 4, room: "R.Coding", teacher: "Sidik", subject: "PaaS", color: "darkgreen" },
    { day: "Senin", start: 9, duration: 3, room: "R.Coding", teacher: "Sidik", subject: "PaaS (XI)", color: "darkgreen" },

    // R.Jaringan
    { day: "Senin", start: 1, duration: 2, room: "R.Jaringan", teacher: "Kuntoro", subject: "PKK WU", color: "red" },
    { day: "Senin", start: 5, duration: 2, room: "R.Jaringan", teacher: "Kiat", subject: "DDPLG 2", color: "purple" },
    { day: "Senin", start: 9, duration: 3, room: "R.Jaringan", teacher: "Endah", subject: "INF", color: "yellow" },

    // R.SIoT (Kosong Senin)

    // RPS 1
    { day: "Senin", start: 1, duration: 4, room: "RPS 1", teacher: "Herman", subject: "SaaS", color: "blue" },
    { day: "Senin", start: 5, duration: 3, room: "RPS 1", teacher: "Gunawan", subject: "IaaS", color: "cyan" },
    { day: "Senin", start: 9, duration: 3, room: "RPS 1", teacher: "Herman", subject: "INF", color: "blue" },

    // RPS 2
    { day: "Senin", start: 1, duration: 8, room: "RPS 2", teacher: "Idiarso", subject: "SKJ", color: "green" },

    // Laptop
    { day: "Senin", start: 5, duration: 2, room: "Laptop", teacher: "Kiat", subject: "DDPLG 2", color: "purple" },
    { day: "Senin", start: 9, duration: 3, room: "Laptop", teacher: "Endah", subject: "INF", color: "yellow" },


    // ================= SELASA =================
    // R.Coding
    { day: "Selasa", start: 1, duration: 4, room: "R.Coding", teacher: "Eko", subject: "GIM", color: "orange" },
    { day: "Selasa", start: 7, duration: 4, room: "R.Coding", teacher: "Eko", subject: "GIM", color: "orange" },

    // R.Jaringan
    { day: "Selasa", start: 1, duration: 3, room: "R.Jaringan", teacher: "Sri Hera", subject: "DPPLG", color: "brown" },
    { day: "Selasa", start: 4, duration: 2, room: "R.Jaringan", teacher: "Kuntoro", subject: "KKA", color: "red" },
    { day: "Selasa", start: 9, duration: 3, room: "R.Jaringan", teacher: "Sri Hera", subject: "DPPLG", color: "brown" }, // Spanning 9-11

    // R.SIoT
    { day: "Selasa", start: 1, duration: 2, room: "R.SIoT", teacher: "Kuntoro", subject: "SD", color: "red" },
    { day: "Selasa", start: 3, duration: 9, room: "R.SIoT", teacher: "Syaifudin Aji", subject: "SIoT", color: "grey" }, // 3-11

    // RPS 1
    { day: "Selasa", start: 1, duration: 3, room: "RPS 1", teacher: "Gunawan", subject: "IaaS", color: "cyan" },
    { day: "Selasa", start: 8, duration: 3, room: "RPS 1", teacher: "Herman", subject: "SaaS", color: "blue" },

    // RPS 2
    { day: "Selasa", start: 2, duration: 4, room: "RPS 2", teacher: "Sidik", subject: "PaaS", color: "darkgreen" }, // 2-5
    { day: "Selasa", start: 6, duration: 3, room: "RPS 2", teacher: "Idiarso", subject: "SKJ", color: "green" }, // 6-8
    { day: "Selasa", start: 10, duration: 1, room: "RPS 2", teacher: "Kuntoro", subject: "KWU", color: "red" },

    // Laptop
    { day: "Selasa", start: 3, duration: 6, room: "Laptop", teacher: "Kiat", subject: "DPPLG", color: "purple" }, // 3-8


    // ================= RABU =================
    // R.Coding
    { day: "Rabu", start: 1, duration: 6, room: "R.Coding", teacher: "Herman", subject: "SaaS", color: "blue" },
    { day: "Rabu", start: 9, duration: 3, room: "R.Coding", teacher: "Sidik", subject: "PaaS", color: "darkgreen" },

    // R.Jaringan
    { day: "Rabu", start: 1, duration: 3, room: "R.Jaringan", teacher: "Sri Hera", subject: "DPPLG", color: "brown" },
    { day: "Rabu", start: 4, duration: 2, room: "R.Jaringan", teacher: "Endah", subject: "KKA", color: "yellow" },
    { day: "Rabu", start: 9, duration: 3, room: "R.Jaringan", teacher: "Sri Hera", subject: "DPPLG", color: "brown" },

    // R.SIoT
    { day: "Rabu", start: 4, duration: 8, room: "R.SIoT", teacher: "Syaifudin Aji", subject: "SIoT", color: "grey" }, // 4-11

    // RPS 1
    { day: "Rabu", start: 1, duration: 3, room: "RPS 1", teacher: "Gunawan", subject: "IaaS", color: "cyan" },
    { day: "Rabu", start: 6, duration: 2, room: "RPS 1", teacher: "Kiat", subject: "DPPLG", color: "purple" },

    // RPS 2
    { day: "Rabu", start: 1, duration: 3, room: "RPS 2", teacher: "Kuntoro", subject: "KWU", color: "red" },
    { day: "Rabu", start: 5, duration: 5, room: "RPS 2", teacher: "Idiarso", subject: "SKJ", color: "green" }, // 5-9

    // Laptop
    { day: "Rabu", start: 1, duration: 3, room: "Laptop", teacher: "Kiat", subject: "DPPLG", color: "purple" },
    { day: "Rabu", start: 9, duration: 3, room: "Laptop", teacher: "Kiat", subject: "DPPLG", color: "purple" },


    // ================= KAMIS =================
    // R.Coding
    { day: "Kamis", start: 1, duration: 1, room: "R.Coding", teacher: "Kuntoro", subject: "SerDes", color: "red" },
    { day: "Kamis", start: 4, duration: 5, room: "R.Coding", teacher: "Sidik", subject: "PaaS", color: "darkgreen" }, // 4-8
    { day: "Kamis", start: 9, duration: 3, room: "R.Coding", teacher: "Herman", subject: "SaaS", color: "blue" },

    // R.Jaringan
    { day: "Kamis", start: 1, duration: 3, room: "R.Jaringan", teacher: "Sri Hera", subject: "DPPLG", color: "brown" },
    { day: "Kamis", start: 5, duration: 2, room: "R.Jaringan", teacher: "Kuntoro", subject: "KWU", color: "red" },
    { day: "Kamis", start: 9, duration: 3, room: "R.Jaringan", teacher: "Sri Hera", subject: "DPPLG", color: "brown" },

    // R.SIoT
    { day: "Kamis", start: 1, duration: 3, room: "R.SIoT", teacher: "Syaifudin Aji", subject: "KKA", color: "grey" },
    { day: "Kamis", start: 4, duration: 3, room: "R.SIoT", teacher: "Herman", subject: "SaaS", color: "blue" }, // 4-6
    { day: "Kamis", start: 7, duration: 4, room: "R.SIoT", teacher: "Syaifudin Aji", subject: "SIoT", color: "grey" }, // 7-10

    // RPS 1
    { day: "Kamis", start: 2, duration: 4, room: "RPS 1", teacher: "Gunawan", subject: "IaaS", color: "cyan" }, // 2-5
    { day: "Kamis", start: 7, duration: 1, room: "RPS 1", teacher: "Kuntoro", subject: "SerDes", color: "red" },
    { day: "Kamis", start: 9, duration: 2, room: "RPS 1", teacher: "Gunawan", subject: "IaaS", color: "cyan" },

    // RPS 2
    { day: "Kamis", start: 1, duration: 2, room: "RPS 2", teacher: "Idiarso", subject: "KKA", color: "green" },
    { day: "Kamis", start: 5, duration: 2, room: "RPS 2", teacher: "Idiarso", subject: "KKA", color: "green" },
    { day: "Kamis", start: 8, duration: 2, room: "RPS 2", teacher: "Sidik", subject: "KKA", color: "darkgreen" },
    { day: "Kamis", start: 10, duration: 2, room: "RPS 2", teacher: "Kuntoro", subject: "KWU", color: "red" },

    // Laptop
    { day: "Kamis", start: 5, duration: 2, room: "Laptop", teacher: "Herman", subject: "SaaS", color: "blue" },
    { day: "Kamis", start: 9, duration: 3, room: "Laptop", teacher: "Kiat", subject: "DPPLG", color: "purple" },


    // ================= JUMAT =================
    // R.Coding
    { day: "Jumat", start: 6, duration: 2, room: "R.Coding", teacher: "Sidik", subject: "PaaS", color: "darkgreen" },

    // R.Jaringan
    { day: "Jumat", start: 7, duration: 2, room: "R.Jaringan", teacher: "Kuntoro", subject: "KWU", color: "red" },

    // R.SIoT
    { day: "Jumat", start: 6, duration: 3, room: "R.SIoT", teacher: "Syaifudin Aji", subject: "SIoT", color: "grey" },

    // RPS 1
    { day: "Jumat", start: 6, duration: 3, room: "RPS 1", teacher: "Gunawan", subject: "INF", color: "cyan" },

    // RPS 2
    { day: "Jumat", start: 5, duration: 3, room: "RPS 2", teacher: "Idiarso", subject: "SKJ", color: "green" },

    // Laptop (Kosong)

];

const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const rooms = ["R.Coding", "R.Jaringan", "R.SIoT", "RPS 1", "RPS 2", "Laptop"];
const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

// Mapping Warna ke Hex Code (Tailored Colors)
const colorMap = {
    "orange": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", // Eko
    "red": "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)", // Kuntoro
    "darkgreen": "linear-gradient(135deg, #10B981 0%, #047857 100%)", // Sidik
    "green": "linear-gradient(135deg, #22C55E 0%, #15803D 100%)", // Idiarso
    "blue": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)", // Herman
    "cyan": "linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)", // Gunawan
    "purple": "linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)", // Kiat
    "yellow": "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)", // Endah
    "brown": "linear-gradient(135deg, #92400E 0%, #78350F 100%)", // Sri Hera
    "grey": "linear-gradient(135deg, #6B7280 0%, #4B5563 100%)", // Syaifudin
};
