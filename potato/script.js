// 1. 유저 제공 안내장 이미지 기준 29개 동아리 + 본부부스 전체 원본 데이터셋
const boothData = [
    { id: 1, name: "도서부", category: "보건 의료 도서 방송", loc: "이동수업실 3" },
    { id: 2, name: "방송부", category: "보건 의료 도서 방송", loc: "이동수업실 2" },
    { id: 3, name: "수아름(수학)", category: "교육 수학 진로 건축", loc: "2-3" },
    { id: 4, name: "너머(진로)", category: "교육 수학 진로 건축", loc: "2-2" },
    { id: 5, name: "아키브(공간건축)", category: "교육 수학 진로 건축", loc: "2-1" },
    { id: 6, name: "티처스랩(교육)", category: "교육 수학 진로 건축", loc: "1-3" },
    { id: 7, name: "프리,티(교육)", category: "교육 수학 진로 건축", loc: "1-2" },
    { id: 8, name: "런업(교육)", category: "교육 수학 진로 건축", loc: "1-1" },
    { id: 9, name: "오르비아", category: "과학", loc: "2-10" },
    { id: 10, name: "메디", category: "과학", loc: "2-9" },
    { id: 11, name: "루멘", category: "과학", loc: "2-8" },
    { id: 12, name: "화생방", category: "과학", loc: "2-7" },
    { id: 13, name: "케미스토리", category: "과학", loc: "1-5" },
    { id: 14, name: "시냅스", category: "과학", loc: "1-4" },
    { id: 15, name: "세이브마이라이프", category: "보건 의료 도서 방송", loc: "2-6" },
    { id: 16, name: "골든타임", category: "보건 의료 도서 방송", loc: "2-5" },
    { id: 17, name: "바이탈엑스", category: "보건 의료 도서 방송", loc: "2-4" },
    { id: 18, name: "따뜻한 팔레트", category: "예체능", loc: "1-10" },
    { id: 19, name: "패션1718", category: "예체능", loc: "1-9" },
    { id: 20, name: "커튼콜", category: "예체능", loc: "1-8" },
    { id: 21, name: "파워챌린지", category: "예체능", loc: "1-7" },
    { id: 22, name: "배구부", category: "예체능", loc: "1-6" },
    { id: 23, name: "비즈비쥬", category: "사회 경제 언론", loc: "2학년자습실" },
    { id: 24, name: "이음", category: "사회 경제 언론", loc: "3-6" },
    { id: 25, name: "비즈딥", category: "사회 경제 언론", loc: "3-5" },
    { id: 26, name: "퓨처웨이브", category: "사회 경제 언론", loc: "3-4" },
    { id: 27, name: "돈터치", category: "사회 경제 언론", loc: "3-3" },
    { id: 28, name: "노스", category: "사회 경제 언론", loc: "3-2" },
    { id: 29, name: "다온", category: "사회 경제 언론", loc: "3-1" },
    { id: 30, name: "본부부스", category: "본부", loc: "본관 2층 (201/202강의실)" }
];

// 2. 가이드라인 제공 3x3 빙고판 고정 레이아웃 구조체 정의
const bingoLayout = [
    { type: "fixed", label: "과학", targetCategory: "과학", req: true },
    { type: "fixed", label: "사회", targetCategory: "사회 경제 언론", req: true },
    { type: "fixed", label: "예체능", targetCategory: "예체능", req: true },
    { type: "fixed", label: "교육·수학<br>진로·건축", targetCategory: "Inter", targetCategory: "교육 수학 진로 건축", req: true },
    { type: "free", label: "자율", req: false },
    { type: "free", label: "자율", req: false },
    { type: "fixed", label: "보건·의료<br>도서·방송", targetCategory: "보건 의료 도서 방송", req: true },
    { type: "free", label: "자율", req: false },
    { type: "free", label: "자율", req: false }
];

// 로그인 핵심 유틸리티
function login() {
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    if (!id.trim() || !name.trim()) { alert("학번과 이름을 입력해주세요!"); return; }
    localStorage.setItem("studentId", id);
    localStorage.setItem("studentName", name);
    window.location.href = "main.html";
}
function checkLoginAndDisplay() {
    const id = localStorage.getItem("studentId");
    const name = localStorage.getItem("studentName");
    if (!id || !name) window.location.href = "index.html";
    else document.getElementById("userInfo").innerText = `${id} ${name}`;
}
function openPage(url) { window.open(url, '_blank'); }

// --- 부스 리스트 렌더링 세션 ---
let boothFilter = 'all';
function renderBooths(filter) {
    boothFilter = filter;
    const container = document.getElementById('boothContainer');
    if(!container) return;
    const favList = JSON.parse(localStorage.getItem("favBooths") || "[]");
    container.innerHTML = "";
    const list = filter === 'all' ? boothData : boothData.filter(b => favList.includes(b.id));

    list.forEach(booth => {
        const isFav = favList.includes(booth.id);
        const item = document.createElement('div');
        item.className = 'booth-item';
        item.innerHTML = `
            <div class="booth-info">
                <h3>[${booth.name}] <span style="font-size:11px; color:#aaa;">(${booth.category})</span></h3>
                <span class="loc"> 위치: ${booth.loc}</span>
            </div>
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${booth.id})">★</button>
        `;
        container.appendChild(item);
    });
}
function toggleFavorite(id) {
    let fav = JSON.parse(localStorage.getItem("favBooths") || "[]");
    fav = fav.includes(id) ? fav.filter(i => i !== id) : [...fav, id];
    localStorage.setItem("favBooths", JSON.stringify(fav));
    renderBooths(boothFilter);
}
function changeTab(tab) {
    document.getElementById('btnAll').classList.toggle('active', tab === 'all');
    document.getElementById('btnFav').classList.toggle('active', tab === 'fav');
    renderBooths(tab);
}

// --- 중복 배제 연동 스탬프 알고리즘 세션 ---
function renderBingo() {
    const board = document.getElementById('bingoBoard');
    if (!board) return;

    const visitedIds = JSON.parse(localStorage.getItem("myStamps") || "[]");
    board.innerHTML = "";
    let pool = [...visitedIds];

    // 1패스: 고정 필수 카테고리 매칭 선점
    const midState = bingoLayout.map(cell => {
        if (cell.type === "fixed") {
            const hit = pool.find(id => boothData.find(b => b.id === id)?.category === cell.targetCategory);
            if (hit) {
                pool = pool.filter(id => id !== hit);
                return { active: true, label: cell.label };
            }
            return { active: false, label: cell.label };
        }
        return { freeSlot: true };
    });

    // 2패스: 잔여 수집 도장 자율 칸 순차 할당
    const finalState = midState.map(cell => {
        if (cell.freeSlot) {
            if (pool.length > 0) {
                const targetId = pool.shift();
                const info = boothData.find(b => b.id === targetId);
                return { active: true, label: `자율<br><span style="font-size:10px; color:#2ecc71;">(${info.name})</span>` };
            }
            return { active: false, label: "자율" };
        }
        return cell;
    });

    // 화면 렌더링 및 엘리먼트 배치
    finalState.forEach((cell, idx) => {
        const div = document.createElement('div');
        div.className = `bingo-cell ${cell.active ? 'active' : ''}`;
        const reqTag = bingoLayout[idx].req ? "<span class='req-badge'>필수!</span>" : "";
        div.innerHTML = `${reqTag}<div style="margin-top:6px;">${cell.label}</div><div class="status">${cell.active ? '🛫' : '❌'}</div>`;
        board.appendChild(div);
    });

    // 빙고 통계 산출
    const mask = finalState.map(c => c.active);
    let bingoCount = 0;
    if (mask[0] && mask[1] && mask[2]) bingoCount++;
    if (mask[3] && mask[4] && mask[5]) bingoCount++;
    if (mask[6] && mask[7] && mask[8]) bingoCount++;
    if (mask[0] && mask[3] && mask[6]) bingoCount++;
    if (mask[1] && mask[4] && mask[7]) bingoCount++;
    if (mask[2] && mask[5] && mask[8]) bingoCount++;
    if (mask[0] && mask[4] && mask[8]) bingoCount++;
    if (mask[2] && mask[4] && mask[6]) bingoCount++;

    document.getElementById('bingoResult').innerText = `현재 ${bingoCount} 빙고! 🎉`;

    // 3빙고 달성 가이드라인 매칭 활성화
    const submitArea = document.getElementById('submitArea');
    if (submitArea) submitArea.style.display = bingoCount >= 3 ? "block" : "none";
}

// 최종 팝업 인증
function submitBingo() {
    const id = localStorage.getItem("studentId");
    const name = localStorage.getItem("studentName");
    alert(`[3빙고 완성 인증 성공]\n\n학번: ${id}\n이름: ${name}\n\n성공 확인 패스가 발급되었습니다!\n이 안내창 화면을 캡처하여 본관 2층 본부 부스로 방문 후 확인받으세요!`);
    const btn = document.getElementById('submitBtn');
    btn.disabled = true; btn.style.backgroundColor = "#7f8c8d"; btn.innerText = "✅ 제출 및 인증 완료";
}

// QR 스캐너 드라이버
let html5QrcodeScanner;
function startQRScanner() {
    document.getElementById('reader').style.display = "block";
    html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}
function onScanSuccess(txt) {
    const p = new URLSearchParams(txt.split('?')[1]);
    let bId = parseInt(p.get('booth') || txt);

    if (isNaN(bId) || bId < 1 || bId > boothData.length) {
        alert("올바르지 않은 축제 전용 QR 코드 마크입니다."); return;
    }

    const b = boothData.find(item => item.id === bId);
    let stamps = JSON.parse(localStorage.getItem("myStamps") || "[]");

    if (stamps.includes(bId)) {
        alert(`이미 [${b.name}] 동아리는 방문 확인 도장을 받았습니다.`);
    } else {
        stamps.push(bId);
        localStorage.setItem("myStamps", JSON.stringify(stamps));
        alert(`🎉 [${b.name}] 도장 획득 성공!\n분류: ${b.category}`);
    }
    html5QrcodeScanner.clear();
    document.getElementById('reader').style.display = "none";
    renderBingo();
}
function onScanFailure(e) {}
