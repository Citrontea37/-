const CACHE_NAME = 'antibiotic-calc-v1';
// 오프라인 상태에서도 캐시에서 불러올 파일 목록입니다.
const urlsToCache = [
    './',
    './index.html', 
    './manifest.json',
    './icon.svg',
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css' 
];

// 설치 단계: 파일들을 캐시에 저장합니다.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('캐시가 성공적으로 열렸습니다.');
                return cache.addAll(urlsToCache);
            })
    );
});

// 패치 단계: 네트워크 요청 시 캐시된 데이터가 있으면 우선적으로 반환합니다.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
