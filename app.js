// ================= app.js =================

// ❶ 모든 종류의 하이픈(– — ­)을 ASCII '-' 하나로 바꿔주는 함수
function normalizeHyphen(str) {
  return str.replace(/[\u2011\u2012\u2013\u2014\u2015]/g, '-');
}

// ❷ 한글 표시용 매핑 테이블
const DISPLAY_LABELS = {
  Aesthetic: {
    "Glitchcore": "글리치코어",
    "Dreamy":     "몽환적",
    "Modern":     "모던",
    "Horror":     "호러",
    "Lo-Fi":      "로파이",
    "Vaporwave":  "베이퍼웨이브"
  },
  Art: {
    "Collage":        "콜라주",
    "Pastel baroque": "파스텔 바로크",
    "Illustration":   "일러스트",
    "Anime":          "애니",
    "Pixel":          "픽셀"
  },
  Composition: {
    "Centered subject": "중앙 피사체",
    "Rule of thirds":    "삼분할 구도",
    "Symmetrical":       "대칭 구도"
  },
  Film: {
    "Disposable film":  "일회용 필름",
    "Damaged film":     "손상된 필름",
    "Heavy grain film": "헤비 그레인 필름",
    "VHS":              "VHS"
  },
  General: {
    "Cinematic":            "시네마틱",
    "Portrait photography": "인물 사진",
    "Product photography":  "제품 사진"
  },
  Pose: {
    "Relaxed":        "편안한 포즈",
    "In motion":      "움직이는 포즈",
    "Surreal anatomy":"초현실 해부학"
  },
  Text: {
    "Theater marquee": "극장 간판",
    "Neon sign":       "네온 사인",
    "Balloon":         "풍선"
  },
  Texture: {
    "Scanner":        "스캐너",
    "Static hologram":"정적 홀로그램",
    "Chrome":         "크롬",
    "Piñata":         "페냐타"
  },
  Scene: {
    "Forest":       "숲",
    "Urban":        "도시",
    "Beach":        "해변",
    "Mountain":     "산",
    "Desert":       "사막",
    "Underwater":   "수중",
    "Space":        "우주",
    "Cityscape":    "도시 풍경",
    "Countryside":  "전원 풍경",
    "Rainy street": "빗속 거리"
  },
  Lighting: {
    "Golden hour": "골든 아워",
    "Rembrandt":   "렘브란트 조명",
    "Butterfly":   "버터플라이 조명",
    "Rim":         "림 라이트",
    "Soft light":  "소프트 라이트",
    "Hard light":  "하드 라이트",
    "Backlighting":"역광",
    "Ambient":     "앰비언트",
    "Studio":      "스튜디오 조명",
    "Neon":        "네온 조명"
  },
  Color: {
    "Warm":         "웜 톤",
    "Cool":         "쿨 톤",
    "Pastel":       "파스텔 톤",
    "Monochrome":   "모노크롬",
    "Vibrant":      "선명한",
    "Muted":        "톤 다운",
    "High contrast":"하이 콘트라스트",
    "Complementary":"보색",
    "Analogous":    "유사색",
    "Triadic":      "삼원색"
  },
  Angle: {
    "Eye level":        "아이 레벨",
    "High angle":       "하이앵글",
    "Low angle":        "로우앵글",
    "Bird's eye view":  "버드아이뷰",
    "Worm's eye view":  "웜아이뷰",
    "Dutch angle":      "더치 앵글",
    "Over the shoulder":"오버 더 숄더",
    "Close-up":         "클로즈업",
    "Wide shot":        "와이드샷",
    "Side view":        "측면"
  },
  Mood: {
    "Happy":       "행복한",
    "Sad":         "슬픈",
    "Mystical":    "신비로운",
    "Eerie":       "오싹한",
    "Romantic":    "로맨틱",
    "Tense":       "긴장감 있는",
    "Calm":        "차분한",
    "Energetic":   "에너지 넘치는",
    "Melancholic": "우울한",
    "Dramatic":    "극적인"
  }
};

// ❸ 한글 키워드 맵
const DISPLAY_KEYWORDS = {
  Aesthetic: {
    "Glitchcore": ["글리치 아트","글리치코어","그레인 텍스처","데이터모쉬","멜팅 픽셀","크로매틱 애버레이션","CRT 정적","로우 콘트라스트","비주얼 이상현상"],
    "Dreamy":     ["몽환적","소프트 포커스","라이트 릭","별 렌즈 플레어","파인 그레인","소프트 블러","에테리얼 글로우","모션 블러"],
    "Modern":     ["포토리얼리스틱","샤프","클린","미니멀","다크 블루 배경","35mm"],
    "Horror":     ["하이 콘트라스트","탈채도","불안정한 움직임","다크 컬러","호러 감성","무서운 피사체","어두운 배경"],
    "Lo-Fi":      ["핸드 드로잉 패널","1980s 일본 로파이 잡지","무채색 톤","파스텔 팔레트","부드러운 그레인","노스탤직 감성","애니메이티드"],
    "Vaporwave":  ["베이퍼웨이브","핑크·퍼플·블루","레트로","네온 글로우","90s 디자인"]
  },
  Art: {
    "Collage":        ["콜라주 스타일","혼합 매체","인쇄 종이 오려 붙임","찢어진 종이 가장자리"],
    "Pastel baroque": ["우아한 바로크 작품","세련된 예술성","뮤티드 파스텔 팔레트","따뜻한 포인트","유화 질감","플로럴 모티브","화려함","우아함 속 혼돈"],
    "Illustration":   ["스토리북 일러스트","두꺼운 선","깔끔한 형태","손그림 느낌","정교한 라인"],
    "Anime":          ["애니메 스타일 일러스트","희미한 배경","플랫 셰이딩"],
    "Pixel":          ["픽셀 아트","복고 게임 느낌 픽셀화"]
  },
  Composition: {
    "Centered subject": ["[subject] 중앙 프레임"],
    "Rule of thirds":    ["시네마틱 스틸","삼분할 구도"],
    "Symmetrical":       ["부드러운 대칭","대칭 구도"]
  },
  Film: {
    "Disposable film":  ["야간 일회용 플래시","비네트","약간 과노출","뮤티드 컬러"],
    "Damaged film":     ["그레인 텍스처","약간 과노출","뮤티드 컬러","필름 스크래치","필름 손상","라이트 릭","즉흥적","빈티지","소프트 포커스","폴라로이드 감성","역사적 흔적"],
    "Heavy grain film": ["헤비 필름 그레인","노이즈","먼지 입자"],
    "VHS":              ["VHS 촬영","아티팩트","트래킹 라인","필름 질감","컬러 블리딩","그레인"]
  },
  General: {
    "Cinematic":            ["시네마틱 사진","무비 스틸","극적 분위기","아나모픽 렌즈","35mm","전문가 구도"],
    "Portrait photography": ["인물 사진","확산 조명","에디토리얼 초상"],
    "Product photography":  ["제품 사진","미니멀","클린","밝은 조명"]
  },
  Pose: {
    "Relaxed":        ["편안한 포즈","우아함"],
    "In motion":      ["자연스러운 모션 블러"],
    "Surreal anatomy":["[subject] 비정상적 곡선","왜곡","일그러짐","과장","영화적","아방가르드"]
  },
  Text: {
    "Theater marquee": ["대문자 극장 간판 텍스트"],
    "Neon sign":       ["네온 사인 텍스트"],
    "Balloon":         ["풍선 글자"]
  },
  Texture: {
    "Scanner":        ["흑백 스캔","빈티지 복사","스캔 늘어짐","그레인 텍스처","거친 질감"],
    "Static hologram":["홀로그램 정적","CRT 노이즈","부드러운 글로우"],
    "Chrome":         ["크롬 질감","반사","광택","무지개빛"],
    "Piñata":         ["피냐타 형태","얇은 색종이"]
  },
  Scene: {
    "Forest":       ["안개 낀 숲","빛줄기","밀집 나무","숲 바닥 이끼"],
    "Urban":        ["도시 스카이라인","가로등","고층 빌딩","붐비는 거리"],
    "Beach":        ["황금 모래","파도","햇빛 번짐","야자수"],
    "Mountain":     ["설산","바위 절벽","높은 고도","안개 낀 산"],
    "Desert":       ["모래 언덕","강렬한 햇빛","건조 풍경","모래바람"],
    "Underwater":   ["산호초","수중 빛줄기","물고기 떼","버블"],
    "Space":        ["별무리","행성","성운","우주 먼지"],
    "Cityscape":    ["도시 야경","반사","황혼"],
    "Countryside":  ["완만한 언덕","농장","풍차","전원집"],
    "Rainy street": ["젖은 도로","웅덩이","반사","빗방울"]
  },
  Lighting: {
    "Golden hour": ["따뜻한 오렌지 빛","긴 부드러운 그림자","낮은 태양 각도","부드러운 역광"],
    "Rembrandt":   ["볼 옆 삼각형 빛","한쪽 밝고 한쪽 그림자","극적 대비"],
    "Butterfly":   ["코 밑 그림자","균일 전면광","글래머러스"],
    "Rim":         ["윤곽선 강조","실루엣","강한 역광"],
    "Soft light":  ["확산광","부드러운 그림자","고른 톤"],
    "Hard light":  ["날카로운 그림자","강한 대비","스펙큘러 하이라이트"],
    "Backlighting":["뒤 조명","헤일로 효과","실루엣"],
    "Ambient":     ["자연광","부드러운 노출","직광 없음"],
    "Studio":      ["제어된 플래시","라이트 모디파이어","중립 배경"],
    "Neon":        ["채널 글로우","반사","채도 높음"]
  },
  Color: {
    "Warm":         ["웜 톤","빨강·주황","아늑함","선셋 팔레트"],
    "Cool":         ["쿨 톤","파랑·초록","청량감","아쿠아 팔레트"],
    "Pastel":       ["부드러운 파스텔","핑크·민트·라벤더","가벼움","몽환적"],
    "Monochrome":   ["흑백","단일 색조","명암","그레이스케일"],
    "Vibrant":      ["채도 높은","선명함","전기적 느낌","강렬한 색상"],
    "Muted":        ["탈채도","소프트 뉴트럴","어스 톤","절제된 팔레트"],
    "High contrast":["강한 명암 대비","대조적 색 배치","극적 팔레트"],
    "Complementary":["보색 대비","강렬 대조","역동적 하모니"],
    "Analogous":    ["인접 색상","조화로운 블렌드","부드러운 전이"],
    "Triadic":      ["삼원색 배열","기본 색상","균형 잡힌 포인트"]
  },
  Angle: {
    "Eye level":        ["자연 시점","중립 시야"],
    "High angle":       ["위에서 아래 시점","피사체 축소","우위 시점"],
    "Low angle":        ["아래에서 위 시점","강조된 위엄","극적 강조"],
    "Bird's eye view":  ["탑다운 뷰","전체 장면","항공샷"],
    "Worm's eye view":  ["지면 시점","거대 피사체","극저 앵글"],
    "Dutch angle":      ["기울어진 수평선","역동적 긴장","비스듬샷"],
    "Over the shoulder":["어깨 너머 뷰","부분 프레임","맥락 전달"],
    "Close-up":         ["클로즈업","얼굴 디테일","친밀한 초점"],
    "Wide shot":        ["와이드샷","전경 포함","넓은 배경"],
    "Side view":        ["측면 시점","실루엣 강조"]
  },
  Mood: {
    "Happy":        ["경쾌한","밝은 분위기","화사한 색상","유쾌함"],
    "Sad":          ["우울한","블루 톤","부드러운 비","감성적 분위기"],
    "Mystical":     ["신비로운","에테리얼 글로우","부드러운 안개","마법적 분위기"],
    "Eerie":        ["오싹한","긴 그림자","스산한 안개","불안감"],
    "Romantic":     ["로맨틱","따뜻한 촛불","부드러운 초점","감성적"],
    "Tense":        ["긴장감","강한 대비","타이트 프레임","극적 긴장"],
    "Calm":         ["차분한","파스텔 톤","고요함","부드러운 바람"],
    "Energetic":    ["활기찬","다이내믹 모션","채도 높은","생동감"],
    "Melancholic":  ["우울한","잔잔한 빗방울","고뇌하는 표정","슬로 셔터 블러"],
    "Dramatic":     ["극적 키아로스쿠로","스포트라이트","깊은 그림자","집중 조명"]
  }
};

// ❹ options.json 불러오기 → 하이픈 정규화 → 렌더링
async function loadOptions() {
  const res     = await fetch('options.json');
  const rawOpts = await res.json();
  const opts    = { __keywords: {} };

  // top‑level 옵션과 키워드 맵 모두 정규화
  for (const [cat, arr] of Object.entries(rawOpts)) {
    if (cat === '__keywords') continue;
    const nCat = normalizeHyphen(cat);
    opts[nCat] = arr.map(v => normalizeHyphen(v));
    const rawKw = rawOpts.__keywords?.[cat] || {};
    opts.__keywords[nCat] = {};
    for (const [optVal, kwList] of Object.entries(rawKw)) {
      const nVal = normalizeHyphen(optVal);
      opts.__keywords[nCat][nVal] =
        kwList.map(k => normalizeHyphen(k));
    }
  }

  renderSelects(opts);
}

// ❺ 셀렉트 & 체크박스 생성
function renderSelects(opts) {
  const form = document.getElementById('prompt-form');
  form.innerHTML = '';
  const cats = Object.keys(opts).filter(k => k !== '__keywords');

  cats.forEach(cat => {
    const vals  = opts[cat];
    const kwMap = opts.__keywords[cat] || {};
    const lbl   = DISPLAY_LABELS[cat]  || {};
    const kwLbl = DISPLAY_KEYWORDS[cat]|| {};

    const wrap = document.createElement('div');
    wrap.style.marginBottom = '12px';
    wrap.innerHTML = `<label>${cat}: </label>`;

    // 1차 select
    const sel1 = document.createElement('select');
    sel1.name = cat;
    sel1.innerHTML =
      '<option value="">(선택)</option>' +
      vals.map(v => {
        const ko = lbl[v] || v;
        return `<option value="${v}">${v} (${ko})</option>`;
      }).join('');
    wrap.append(sel1);

    // 2차 체크박스
    const box = document.createElement('div');
    box.style.marginLeft = '16px';
    wrap.append(box);

    sel1.addEventListener('change', () => {
      box.innerHTML = '';
      const orig = kwMap[sel1.value] || [];
      const klab = kwLbl[sel1.value]|| [];
      if (orig.length) {
        orig.forEach((kw, i) => {
          const id = `chk-${cat}-${i}`;
          const cb = document.createElement('input');
          cb.type  = 'checkbox';
          cb.id    = id;
          cb.name  = `${cat}-kw`;
          cb.value = kw;
          const lb = document.createElement('label');
          lb.htmlFor = id;
          lb.textContent = `${kw} (${klab[i]||kw})`;
          const row = document.createElement('div');
          row.append(cb, lb);
          box.append(row);
        });
      } else {
        const n = document.createElement('div');
        n.textContent = '(키워드 없음)';
        box.append(n);
      }
    });

    form.append(wrap);
  });

  // 생성 버튼
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = '프롬프트 생성';
  btn.style.marginTop = '16px';
  btn.addEventListener('click', generatePrompt);
  form.append(btn);
}

// ❻ 프롬프트 조합
function generatePrompt() {
  const parts = [];
  document.querySelectorAll('#prompt-form select:not([multiple])')
    .forEach(s => s.value && parts.push(s.value));
  document.querySelectorAll('#prompt-form input[type="checkbox"]:checked')
    .forEach(cb => parts.push(cb.value));

  const out = parts.length
    ? parts.join(', ') + '.'
    : '(선택된 옵션이 없습니다)';
  document.getElementById('result').textContent = out;
}

// ❼ 복사하기
function copyToClipboard() {
  const txt = document.getElementById('result').textContent;
  navigator.clipboard.writeText(txt)
    .then(() => alert('프롬프트 복사'))
    .catch(e => alert('복사 실패: ' + e));
}

// ❽ 초기화
window.addEventListener('DOMContentLoaded', () => {
  loadOptions();
  document.getElementById('copyBtn')
    .addEventListener('click', copyToClipboard);
});
