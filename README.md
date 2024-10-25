# RTC Admin 대시보드

WebRTC 화상 채팅 애플리케이션의 관리자 대시보드입니다. 실시간으로 대기실과 통화방의 상태를 모니터링하고 사용자들에게 메시지를 전송할 수 있습니다.

[관리자 대시보드 사이트](https://rtc-admin.vercel.app)

## 주요 기능

- 실시간 대기실 모니터링
  - 접속 중인 사용자 수 확인
  - 사용자 목록 조회
- 통화방 관리
  - 현재 통화 중인 방 목록 확인
  - 각 방의 참여자 정보 조회
  - 특정 방의 사용자들에게 메시지 전송
- 실시간 업데이트
  - Socket.io를 통한 실시간 상태 동기화
  - 방 상태 변경 실시간 반영

## 기술 스택

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **배포**: Vercel

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── RoomItem.tsx    # 통화방 아이템 컴포넌트
│   ├── WaitingRoom.tsx # 대기실 컴포넌트
│   └── ui/             # UI 컴포넌트 (shadcn)
├── lib/                # 유틸리티 함수
└── App.tsx             # 메인 애플리케이션 컴포넌트
```

## 주요 컴포넌트

### RoomItem

- 개별 통화방 정보 표시
- 방 참여자 목록 표시
- 메시지 전송 다이얼로그 포함

### WaitingRoom

- 대기실 상태 표시
- 대기 중인 사용자 목록 표시

## Socket 이벤트

### 수신 이벤트

- `roomUpdate`: 방 정보 업데이트

### 발신 이벤트

- `adminMessage`: 특정 방에 메시지 전송
