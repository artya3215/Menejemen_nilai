<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mahasiswa Panel | Sistem Penilaian</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
    
    <style>
        .sidebar-mhs {
            width: 280px;
            min-height: 100vh;
            background-color: #007bff; /* bg-primary */
            flex-shrink: 0;
        }
        .nav-link.active-mhs {
            background-color: #17a2b8 !important; /* bg-info */
            color: white !important;
            font-weight: bold;
        }
        .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .bg-light-custom {
            background-color: #f8f9fa !important; /* Latar utama konten */
        }
    </style>

</head>
<body class="d-flex">

    <div class="sidebar-mhs d-flex flex-column p-3 text-white shadow-lg">
        <div class="text-center mb-4 border-bottom pb-3">
            <i class="bi bi-mortarboard-fill text-white fs-2"></i>
            <h5 class="text-white mt-2 fw-bold">Mahasiswa Panel</h5>
        </div>
        <hr class="mt-0" />

        <ul class="nav nav-pills flex-column mb-auto">
            @php
                // Logika Menu Mahasiswa
                $menuItems = [
                    ['path' => '/mahasiswa/dashboard', 'name' => 'Dashboard', 'icon' => 'bi-house-door-fill'],
                    ['path' => '/mahasiswa/tugas', 'name' => 'Tugas Saya', 'icon' => 'bi-journal-check'],
                    ['path' => '/mahasiswa/nilai', 'name' => 'Nilai (KHS)', 'icon' => 'bi-bar-chart-fill'],
                    ['path' => '/mahasiswa/kelompok', 'name' => 'Kelompok Proyek', 'icon' => 'bi-people-fill'],
                ];
                $currentRoute = Request::path();
            @endphp

            @foreach ($menuItems as $item)
                <li class="nav-item">
                    <a href="{{ url($item['path']) }}" 
                       class="nav-link text-white {{ str_starts_with($currentRoute, ltrim($item['path'], '/')) ? 'active-mhs' : '' }}">
                        <i class="bi {{ $item['icon'] }} me-2"></i>
                        {{ $item['name'] }}
                    </a>
                </li>
            @endforeach
        </ul>
        <hr />

        <div class="dropdown">
             <a href="#" class="d-flex align-items-center text-white text-decoration-none" id="dropdownUser1">
                <i class="bi bi-person-circle fs-4 me-2"></i>
                <strong>{{ Auth::user()->name ?? 'Rani Wijaya' }}</strong>
            </a>
            {{-- Tambahkan form Logout di sini --}}
        </div>
    </div>
    
    <div class="flex-grow-1 d-flex flex-column">
        
        <header class="navbar navbar-light bg-white shadow-sm p-3 border-bottom sticky-top">
            <div class="container-fluid">
                <h4 class="mb-0 text-primary fw-bold">@yield('page-title', 'Mahasiswa Panel')</h4> 
            </div>
        </header>

        <main class="flex-grow-1 p-4 overflow-auto bg-light-custom"> 
            <div class="container-fluid">
                @yield('content')
            </div>
        </main>
        
        <footer class="text-center text-muted p-2 border-top bg-white">
            <small>© 2025 Sistem Penilaian Lapangan. Mahasiswa Panel.</small>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>