document.addEventListener('DOMContentLoaded', () => {
    const mainSlider = document.getElementById('mainSlider');
    const sliderNav = document.querySelectorAll('.slider-indicators span');
    const schoolLogo = document.getElementById('schoolLogo');
    const teacherSelect = document.getElementById('teacherSelect');
    // const teacherCardsContainer = document.getElementById('teacherCards'); // Removed
    // const roomCardsContainer = document.getElementById('roomCards'); // Removed

    // Asset paths
    const assets = {
        logo: 'assets/logosija.png',
        slides: [
            'assets/slider/slider1.jpeg',
            'assets/slider/slider2.jpeg',
            'assets/slider/slider3.jpeg'
        ],
        teacherPlaceholder: 'assets/schedule_placeholder_1769605737002.png',
        roomPlaceholder: 'assets/room_schedule_placeholder_1769606341684.png'
    };

    // Initialize Logo
    schoolLogo.src = assets.logo;

    // Initialize Slider
    assets.slides.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `url(${src})`;
        mainSlider.appendChild(slide);
    });

    let currentSlide = 0;
    const rotateSlider = () => {
        currentSlide = (currentSlide + 1) % assets.slides.length;
        mainSlider.style.transform = `translateX(-${currentSlide * (100 / assets.slides.length)}%)`;

        sliderNav.forEach((nav, idx) => {
            nav.classList.toggle('active', idx === currentSlide);
        });
    };

    setInterval(rotateSlider, 5000);

    // Manual Slider Nav
    sliderNav.forEach((nav, idx) => {
        nav.addEventListener('click', () => {
            currentSlide = idx;
            mainSlider.style.transform = `translateX(-${currentSlide * (100 / assets.slides.length)}%)`;
            sliderNav.forEach((n, i) => n.classList.toggle('active', i === currentSlide));
        });
    });

    // Room Names Data
    const roomNames = [
        "RPS 1",
        "RPS 2",
        "RPS KONSORSIUM",
        "RPS IOT",
        "RPS JARINGAN"
    ];

    // Generate unique image based on teacher and class combination
    const getScheduleImage = (teacher, cls) => {
        const combo = teacher + cls;
        let hash = 0;
        for (let i = 0; i < combo.length; i++) {
            hash = combo.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % assets.slides.length;
        return assets.slides[index];
    };

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-lightbox');

    const openLightbox = (imgSrc, title, desc) => {
        lightbox.style.display = "flex";
        lightbox.style.flexDirection = "column";
        lightbox.style.justifyContent = "center";

        lightboxImg.src = imgSrc;
        lightboxImg.classList.remove('zoomed');

        // Add Zoom Hint if not exists
        if (!document.querySelector('.zoom-hint')) {
            const hint = document.createElement('div');
            hint.className = 'zoom-hint';
            hint.innerHTML = '<i class="fas fa-search-plus"></i> Klik gambar untuk Zoom';
            lightboxImg.parentNode.insertBefore(hint, lightboxImg);
        }

        captionText.innerHTML = `<strong>${title}</strong><br>${desc}`;

        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.href = imgSrc;
            downloadBtn.setAttribute('download', `Jadwal_${title.replace(/\s+/g, '_')}.png`);
        }

        document.body.style.overflow = 'hidden'; // Disable scroll
    };

    closeBtn.onclick = () => {
        lightbox.style.display = "none";
        lightboxImg.classList.remove('zoomed');
        document.body.style.overflow = 'auto'; // Enable scroll
    };

    // Zoom Logic
    lightboxImg.onclick = (e) => {
        e.stopPropagation();
        lightboxImg.classList.toggle('zoomed');
    };

    // Close on outside click
    window.onclick = (event) => {
        if (event.target == lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    };

    // Helper: Create Teacher Card Element
    const createTeacherCard = (teacherName, className, roomName) => {
        const scheduleImage = getScheduleImage(teacherName, className);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${scheduleImage}" alt="Jadwal ${teacherName}">
            <div class="card-overlay">
                <h3>${roomName}</h3>
                <p>${teacherName} - Kelas ${className}</p>
            </div>
        `;
        // Lightbox Event
        card.addEventListener('click', () => {
            openLightbox(scheduleImage, roomName, `${teacherName} - Kelas ${className}`);
        });
        return card;
    };

    // Helper: Create Room Card Element
    const createRoomCard = (roomName, className) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${assets.roomPlaceholder}" alt="${roomName}">
            <div class="card-overlay">
                <h3>${roomName}</h3>
                <p>Kelas ${className}</p>
            </div>
        `;
        // Lightbox Event
        card.addEventListener('click', () => {
            openLightbox(assets.roomPlaceholder, roomName, `Jadwal Ruang Kelas ${className}`);
        });
        return card;
    };

    // Live Time & Greeting Logic
    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayName = days[now.getDay()];
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        const clockEl = document.getElementById('clockText');
        if (clockEl) clockEl.innerText = `${dayName}, ${formattedTime}`;

        let greeting = 'Halo!';
        if (hours >= 4 && hours < 11) greeting = 'Selamat Pagi, Sobat SIJA!';
        else if (hours >= 11 && hours < 15) greeting = 'Selamat Siang, Sobat SIJA!';
        else if (hours >= 15 && hours < 18) greeting = 'Selamat Sore, Sobat SIJA!';
        else greeting = 'Selamat Malam, Sobat SIJA!';

        const greetingEl = document.getElementById('greetingText');
        if (greetingEl) greetingEl.innerText = greeting;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // 5. TEACHER SCHEDULE LOGIC (DYNAMIC GRID)
    const updateTeacherCards = () => {
        const selectedTeacherFull = teacherSelect.value;
        const teacherScheduleGrid = document.getElementById('teacherScheduleGrid');

        if (!teacherScheduleGrid) return;
        teacherScheduleGrid.innerHTML = '';

        // 1. Render Time Slots (Column 1)
        for (let i = 1; i <= 11; i++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot-marker';
            timeSlot.style.gridRow = `${i} / span 1`;
            timeSlot.innerHTML = `<span style="font-size:1.2rem">${i}</span>`;
            teacherScheduleGrid.appendChild(timeSlot);
        }

        // Column Mapping for Days
        const dayColumnMap = {
            "Senin": 2, "Selasa": 3, "Rabu": 4, "Kamis": 5, "Jumat": 6
        };

        // Name Matching Helper
        // Checks if any part of the short name (data) exists in the full name (selection)
        // Name Matching Helper (FIXED)
        // Uses only the first distinctive word to avoid matching titles (e.g. "S" from "Eko S" matching "S.Pd")
        const isMatch = (dataName, fullName) => {
            if (!dataName || !fullName) return false;
            const distinctiveName = dataName.split(' ')[0].toLowerCase();
            return fullName.toLowerCase().includes(distinctiveName);
        };

        if (typeof scheduleData !== 'undefined') {
            // Filter events for the selected teacher
            const teacherEvents = scheduleData.filter(evt => isMatch(evt.teacher, selectedTeacherFull));

            teacherEvents.forEach(evt => {
                const col = dayColumnMap[evt.day];
                if (!col) return;

                const el = document.createElement('div');
                el.className = 'schedule-item';

                // Position
                el.style.gridColumn = col;
                el.style.gridRow = `${evt.start} / span ${evt.duration}`;

                // Style
                const bgGradient = (colorMap && colorMap[evt.color]) ? colorMap[evt.color] : '#666';
                el.style.background = bgGradient;

                // Content (Show Room instead of Teacher name since we know the teacher)
                el.innerHTML = `
                    <div class="schedule-item-subject">${evt.subject}</div>
                    <span class="schedule-item-room" style="position:static; display:block; font-size:0.7rem; margin-top:4px;">${evt.room}</span>
                `;

                // Animation
                el.style.animation = `fadeDown 0.5s ease forwards ${evt.start * 0.05}s`;
                el.style.opacity = '0';

                teacherScheduleGrid.appendChild(el);
            });

            // If no schedule found
            if (teacherEvents.length === 0) {
                // Optional: Show "No schedule" message overlay
            }
        }
    };

    // 6. ROOM SCHEDULE LOGIC (DYNAMIC GRID)
    const roomSelect = document.getElementById('roomSelect'); // New ID from HTML update
    const renderRoomSchedule = () => {
        const selectedRoom = roomSelect.value;
        const roomScheduleGrid = document.getElementById('roomScheduleGrid');

        if (!roomScheduleGrid) return;
        roomScheduleGrid.innerHTML = '';

        // 1. Render Time Slots
        for (let i = 1; i <= 11; i++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot-marker';
            timeSlot.style.gridRow = `${i} / span 1`;
            timeSlot.innerHTML = `<span style="font-size:1.2rem">${i}</span>`;
            roomScheduleGrid.appendChild(timeSlot);
        }

        // Column Mapping
        const dayColumnMap = {
            "Senin": 2, "Selasa": 3, "Rabu": 4, "Kamis": 5, "Jumat": 6
        };

        if (typeof scheduleData !== 'undefined') {
            // Filter events for the exact room name match
            const roomEvents = scheduleData.filter(evt => evt.room === selectedRoom);

            roomEvents.forEach(evt => {
                const col = dayColumnMap[evt.day];
                if (!col) return;

                const el = document.createElement('div');
                el.className = 'schedule-item';
                el.style.gridColumn = col;
                el.style.gridRow = `${evt.start} / span ${evt.duration}`;

                const bgGradient = (colorMap && colorMap[evt.color]) ? colorMap[evt.color] : '#666';
                el.style.background = bgGradient;

                // Show Teacher & Subject for Room View
                el.innerHTML = `
                    <div class="schedule-item-subject">${evt.subject}</div>
                    <div class="schedule-item-teacher">${evt.teacher}</div>
                `;

                el.style.animation = `fadeDown 0.5s ease forwards ${evt.start * 0.05}s`;
                el.style.opacity = '0';

                roomScheduleGrid.appendChild(el);
            });
        }
    };

    // Event Listener for Room Select
    if (roomSelect) {
        roomSelect.addEventListener('change', renderRoomSchedule);
        // Initial call
        renderRoomSchedule();
    }

    // Trigger teacher update too
    teacherSelect.addEventListener('change', updateTeacherCards);


    // Navbar Scroll Spy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.3 // Trigger when 30% of section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Card Animation Logic (Updated for Schedule Items)
    // We can use a simple observer to trigger animations when grids come into view if needed
    // But for now, let's just ensure we don't crash on missing elements.

    /* 
    const animateCards = (container) => { ... } // Removed old logic
    */

    // Search Results Container still exists?
    const searchResultsContainer = document.getElementById('searchResults');
    if (searchResultsContainer) {
        // Optional: Add observer for search results if you want animations there
    }

    // Initial Load
    updateTeacherCards();
    // renderRoomSchedule is called in its own block if roomSelect exists

    // Check initial visibility for animations - Removed as it caused errors


    // ==========================================
    // NEW FEATURES (Dark Mode & Search)
    // ==========================================

    // 1. Dark Mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle.querySelector('i');

    // Check local storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // 2. Global Search (Refined)
    const searchInput = document.getElementById('globalSearch');
    const searchResultSection = document.getElementById('search-result-section');
    const noResults = document.getElementById('noResults');

    const performSearch = (query) => {
        searchResultsContainer.innerHTML = '';
        let hasResults = false;

        if (!query) {
            searchResultSection.style.display = 'none';
            return;
        }

        searchResultSection.style.display = 'block';

        const allClasses = ['X', 'XI', 'XII'];

        // 1. Search Teachers
        // Requirement: Show all schedules (Class 10-12) if searching by teacher
        const teacherOptions = Array.from(teacherSelect.options);

        teacherOptions.forEach(opt => {
            if (opt.text.toLowerCase().includes(query)) {
                allClasses.forEach(cls => {
                    roomNames.forEach(room => {
                        const card = createTeacherCard(opt.value, cls, room);
                        searchResultsContainer.appendChild(card);
                        hasResults = true;
                    });
                });
            }
        });

        // 2. Search Rooms
        // Requirement: Search by room name (e.g. "rps konsorsium")
        // We also show all classes for the room to provide complete info
        roomNames.forEach(room => {
            if (room.toLowerCase().includes(query)) {
                allClasses.forEach(cls => {
                    const card = createRoomCard(room, cls);
                    searchResultsContainer.appendChild(card);
                    hasResults = true;
                });
            }
        });

        // 3. Search Classes (Helper for direct class search, e.g. "XII")
        const queryUpper = query.toUpperCase();
        const matchedClasses = allClasses.filter(c =>
            queryUpper === c ||
            (c === 'X' && (queryUpper === '10' || queryUpper.includes('KELAS 10'))) ||
            (c === 'XI' && (queryUpper === '11' || queryUpper.includes('KELAS 11'))) ||
            (c === 'XII' && (queryUpper === '12' || queryUpper.includes('KELAS 12')))
        );

        if (matchedClasses.length > 0) {
            matchedClasses.forEach(cls => {
                roomNames.forEach(room => {
                    // Verify uniqueness if needed, but for now specific search is fine
                    const card = createRoomCard(room, cls);
                    searchResultsContainer.appendChild(card);
                    hasResults = true;
                });
            });
        }

        if (hasResults) {
            noResults.style.display = 'none';
            // animateCards(searchResultsContainer); // Removed
        } else {
            noResults.style.display = 'block';
        }
    };

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        performSearch(query);
    });

    // Auto-scroll on Enter
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (searchResultSection.style.display !== 'none') {
                searchResultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // 3. Teacher Profiles Data
    const teacherProfiles = [
        { name: "Syaifudin Aji Negara S.pd, Gr", nick: "Pak Aji", mapel: "Internet of Things", img: "foto_guru/guru1.png" },
        { name: "Sri Herawan Kusuma S.Kom", nick: "Bu Sri", mapel: "Dasar - dasar PPLG 1", img: "foto_guru/guru2.png" },
        { name: "Hermanto S.Pd", nick: "Pak Hermanto", mapel: "Sistem Informasi dan Aplikasi", img: "foto_guru/guru3.png" },
        { name: "Idiarso S.Kom", nick: "Pak Idiarso", mapel: "Sistem Keamanan Jaringan", img: "foto_guru/guru4.png" },
        { name: "Eko Santoso S.Pd", nick: "Pak Eko", mapel: "GIM", img: "foto_guru/guru5.png" },
        { name: "Sidik Nurcahyo S.Pd", nick: "Pak Sidik", mapel: "Platform Komputasi Awan", img: "foto_guru/guru6.png" },
        { name: "Kuntoro Triatmoko S.Kom", nick: "Pak Kuntoro", mapel: "Kewirausahaan", img: "foto_guru/guru7.jpg" },
        { name: "Gunawan Wibisono S.Kom", nick: "Pak Gunawan", mapel: "Infrastuktur komputasi Awan", img: "foto_guru/guru8.png" },
        { name: "Kiat Uji Purwani S.Kom", nick: "Bu Kiat", mapel: "Dasar - dasar PPLG 2", img: "foto_guru/guru9.png" },
        { name: "Endah Yuliani S.Pd", nick: "Bu Endah", mapel: "Kewirausahaan", img: "foto_guru/guru10.png" }
    ];

    const initProfiles = () => {
        const profileGrid = document.getElementById('teacherProfileGrid');
        if (!profileGrid) return;

        teacherProfiles.forEach(profile => {
            const card = document.createElement('div');
            card.className = 'profile-card';
            card.innerHTML = `
                <div class="profile-img-wrapper">
                    <img src="${profile.img}" alt="${profile.name}">
                </div>
                <div class="profile-info">
                    <h3>${profile.name}</h3>
                    <p>${profile.mapel}</p>
                </div>
            `;
            profileGrid.appendChild(card);
        });

        // Add Staggered Animation Observer
        const profileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const cards = entry.target.querySelectorAll('.profile-card');
                if (entry.isIntersecting) {
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                } else {
                    // Reset animation when scrolling out so it plays again
                    cards.forEach(card => card.classList.remove('visible'));
                }
            });
        }, { threshold: 0.15 });

        profileObserver.observe(profileGrid);
    };

    initProfiles();

    // ==========================================
    // 4. MASTER SCHEDULE LOGIC (MIGRATION)
    // ==========================================

    const renderMasterSchedule = (day) => {
        const masterScheduleGrid = document.getElementById('masterScheduleGrid');
        if (!masterScheduleGrid) return;

        masterScheduleGrid.innerHTML = '';

        // 1. Render Time Slots Markers (Column 1)
        // Rows 1-11 correspond to Periods 1-11
        for (let i = 1; i <= 11; i++) {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot-marker';
            timeSlot.style.gridRow = `${i} / span 1`;
            timeSlot.innerHTML = `<span style="font-size:1.2rem">${i}</span>`;
            masterScheduleGrid.appendChild(timeSlot);
        }

        // Room Column Mapping
        const roomColumnMap = {
            "R.Coding": 2,
            "R.Jaringan": 3,
            "R.SIoT": 4, // Maps to grid column 4
            "RPS 1": 5,
            "RPS 2": 6,
            "Laptop": 7
        };

        // 2. Filter & Render Events
        // Ensure scheduleData is available (loaded from data_jadwal.js)
        if (typeof scheduleData !== 'undefined') {
            const dayEvents = scheduleData.filter(evt => evt.day === day);

            dayEvents.forEach(evt => {
                const col = roomColumnMap[evt.room];
                // Handle case where room name might differ slightly (e.g. R.SloT vs R.SIoT)
                // If not found, try normalization or skip
                if (!col) return;

                const el = document.createElement('div');
                el.className = 'schedule-item';

                // Grid Positioning
                el.style.gridColumn = col;
                el.style.gridRow = `${evt.start} / span ${evt.duration}`;

                // Color Styling
                // colorMap is global in data_jadwal.js
                const bgGradient = (typeof colorMap !== 'undefined' && colorMap[evt.color])
                    ? colorMap[evt.color]
                    : 'linear-gradient(135deg, #6B7280 0%, #374151 100%)'; // Fallback grey
                el.style.background = bgGradient;

                // Content
                el.innerHTML = `
                    <div class="schedule-item-subject">${evt.subject}</div>
                    <div class="schedule-item-teacher">${evt.teacher}</div>
                    <span class="schedule-item-room">${evt.room}</span>
                `;

                // Optional: Animation delay based on position
                el.style.animation = `fadeDown 0.5s ease forwards ${evt.start * 0.05}s`;
                el.style.opacity = '0'; // Start hidden for animation

                masterScheduleGrid.appendChild(el);
            });
        }
    };

    // Tab Interactivity
    const dayTabs = document.getElementById('dayTabs');
    if (dayTabs) {
        dayTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                // Switch Active State
                dayTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Render New Day
                const selectedDay = e.target.dataset.day;
                renderMasterSchedule(selectedDay);
            }
        });
    }

    // Initial Render Call
    renderMasterSchedule('Senin');

});
