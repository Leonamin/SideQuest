아래는 바로 `PRODUCT.md` / Notion / Linear 기획 문서로 옮길 수 있는 형태의 **SideQuest 상세 기획서 초안**이다.

Linear 관련 구현 전제는 공식 문서 기준으로 잡았다. Linear는 public API를 GraphQL로 제공하고, Webhook으로 데이터 생성·수정 이벤트를 받을 수 있으며, 앱 연동에는 OAuth 2.0 인증이 권장된다. 또한 Linear의 issue status는 팀별 workflow에 종속된다. ([Linear][1])

---

# SideQuest 기획서

## 1. 프로젝트 개요

### 1.1 프로젝트명

**SideQuest**

### 1.2 한 줄 소개

> SideQuest는 Linear 또는 자체 To-Do를 퀘스트로 변환하고, 프로젝트 진행 상황에 따라 팀의 픽셀 펫이 성장하는 게임형 생산성 레이어다.

### 1.3 핵심 컨셉

SideQuest는 Jira, Linear, Notion 같은 PM 툴을 대체하는 제품이 아니다.

기본 포지션은 다음과 같다.

> **Linear 위에 얹히는 게임 레이어 + Linear를 쓰지 않는 사용자를 위한 초경량 To-Do 기능**

즉, SideQuest는 업무 관리의 중심이 아니라 **동기부여와 시각적 보상 레이어**다.

---

## 2. 제품 포지셔닝

### 2.1 SideQuest가 아닌 것

SideQuest는 다음을 목표로 하지 않는다.

* Jira 대체
* Linear 대체
* Notion 대체
* 완전한 프로젝트 관리 시스템
* 복잡한 권한 관리 시스템
* 대규모 엔터프라이즈 협업 도구
* 간트 차트 / 스프린트 관리 / 로드맵 관리 도구

### 2.2 SideQuest가 되는 것

SideQuest는 다음을 목표로 한다.

* 프로젝트 진행 상황을 게임처럼 보여주는 레이어
* Linear issue를 퀘스트로 변환하는 시각화 도구
* To-Do 완료를 XP와 펫 성장으로 보상하는 시스템
* 사이드 프로젝트의 지속 동기를 높이는 감정적 장치
* 팀 전체가 하나의 펫을 키우는 공동 목표 시스템
* 픽셀 RPG 스타일의 프로젝트 대시보드

### 2.3 핵심 문장

> “업무 관리는 Linear에서, 동기부여는 SideQuest에서.”

단, Linear를 쓰지 않는 사용자를 위해 최소한의 자체 To-Do 기능은 제공한다.

---

## 3. 문제 정의

### 3.1 기존 To-Do / PM 툴의 문제

일반적인 To-Do 앱이나 PM 툴은 다음 문제를 가진다.

* 할 일 완료의 감정적 보상이 약하다.
* 사이드 프로젝트는 장기 지속이 어렵다.
* 팀원이 바빠지면 프로젝트가 쉽게 방치된다.
* 진행률 숫자만으로는 동기부여가 약하다.
* “해야 한다”는 압박은 있지만 “하고 싶다”는 감각이 부족하다.
* 완료한 작업이 축적되어도 성장감이 약하다.

### 3.2 SideQuest가 해결하려는 문제

SideQuest는 다음 문제를 해결한다.

* 프로젝트 진행을 시각적 성장으로 바꾼다.
* 할 일을 퀘스트처럼 보이게 만든다.
* 완료를 XP, 레벨업, 진화, 보상으로 연결한다.
* 방치 상태를 펫의 감정 상태로 표현한다.
* 팀 프로젝트에 공동 육성 대상을 만든다.
* 지루한 사이드 프로젝트를 게임 루프처럼 만든다.

---

## 4. 핵심 사용자

### 4.1 1인 사이드 프로젝트 개발자

특징:

* Linear까지 쓰기에는 부담스럽다.
* 간단한 To-Do만 관리하고 싶다.
* 프로젝트를 오래 끌고 가기 어렵다.
* 작업 완료에 재미를 붙이고 싶다.

필요 기능:

* 자체 To-Do
* 개인 프로젝트
* 개인 펫
* 간단한 XP/레벨업
* 진행률 시각화

### 4.2 소규모 팀 / 스터디 / 해커톤 팀

특징:

* 2~5명이 함께 작업한다.
* Linear 또는 GitHub Issues를 쓸 수 있다.
* 팀원들의 진행 상황을 재미있게 보고 싶다.
* 공동의 상징이 필요하다.

필요 기능:

* 팀 프로젝트
* 공유 펫
* Linear 연동
* 팀원별 기여도
* 프로젝트 진행률
* 마일스톤 보상

### 4.3 Linear를 쓰는 개발팀

특징:

* 실제 업무 관리는 Linear에서 한다.
* SideQuest에서는 게임화만 원한다.
* issue 생성/수정은 Linear에서 하고 싶다.
* SideQuest가 Linear 데이터를 망가뜨리면 안 된다.

필요 기능:

* Linear OAuth
* Linear project 선택
* issue 동기화
* 완료 상태 감지
* 읽기 중심 연동
* 선택적 상태 업데이트

---

## 5. 핵심 용어 매핑

| 일반 개념             | Linear 개념       | SideQuest 개념    |
| ----------------- | --------------- | --------------- |
| Workspace         | Workspace       | Guild           |
| Team              | Team            | Party           |
| Project           | Project         | World           |
| Milestone / Cycle | Cycle / Roadmap | Chapter         |
| Issue             | Issue           | Quest           |
| Sub-issue         | Sub-issue       | Sub Quest       |
| Done status       | Done            | Quest Clear     |
| Estimate          | Estimate        | Difficulty / XP |
| Priority          | Priority        | Danger Level    |
| Label             | Label           | Quest Type      |
| Assignee          | Assignee        | Adventurer      |
| Progress          | Progress        | World Recovery  |
| Project mascot    | 없음              | Pet / Buddy     |

---

## 6. 핵심 제품 구조

SideQuest는 두 가지 Quest Source를 가진다.

```text
Quest Source A: Linear
Quest Source B: SideQuest Local To-Do
```

전체 구조:

```text
Linear Issues ─────┐
                   ├─ Quest Normalization ─ XP Engine ─ Pet State Machine ─ Game UI
Local To-Do ───────┘
```

핵심은 모든 작업을 내부적으로 `Quest`라는 공통 모델로 변환하는 것이다.

---

## 7. 핵심 게임 루프

### 7.1 기본 루프

```text
프로젝트 생성
→ 펫 생성
→ 퀘스트 생성 또는 Linear에서 동기화
→ 퀘스트 수행
→ 완료 처리
→ XP 획득
→ 펫 성장
→ 감정/외형 변화
→ 다음 퀘스트 수행
```

### 7.2 감정 루프

```text
작업 완료
→ 펫이 기뻐함
→ XP 바 상승
→ 레벨업 또는 보상
→ 사용자가 다시 작업하고 싶어짐
```

### 7.3 방치 루프

```text
일정 기간 미진행
→ 펫이 졸림/배고픔/슬픔 상태가 됨
→ 사용자가 다시 접속
→ 퀘스트 완료
→ 펫 회복
```

---

## 8. 핵심 기능 목록

# 8.1 계정 / 워크스페이스 기능

## 기능

* 회원가입
* 로그인
* 로그아웃
* 워크스페이스 생성
* 개인 프로젝트 생성
* 팀 프로젝트 생성
* 팀원 초대
* 프로젝트 삭제
* 프로젝트 아카이브

## MVP 포함 여부

| 기능        | MVP   |
| --------- | ----- |
| 이메일 로그인   | 포함    |
| 개인 프로젝트   | 포함    |
| 팀 프로젝트    | 선택    |
| 팀원 초대     | V2    |
| 워크스페이스 관리 | 최소 포함 |
| 프로젝트 아카이브 | V2    |

## 구현 목표

MVP에서는 복잡한 조직 구조를 만들지 않는다.

```text
User
→ Workspace
→ Project
→ Quest
→ Pet
```

정도로 단순화한다.

---

# 8.2 프로젝트 생성 기능

## 목적

사용자가 SideQuest에서 게임화할 프로젝트를 생성한다.

## 프로젝트 타입

| 타입             | 설명                     |
| -------------- | ---------------------- |
| Local Project  | SideQuest 내부 To-Do만 사용 |
| Linear Project | Linear에서 issue를 가져와 사용 |

## 생성 플로우

```text
1. 프로젝트 이름 입력
2. 프로젝트 타입 선택
   - 자체 To-Do
   - Linear 연결
3. 프로젝트 분위기 선택
   - 개발
   - 공부
   - 디자인
   - 창작
   - 운동
   - 기타
4. 펫 생성
5. 대시보드 진입
```

## 구현 목표

MVP에서는 다음 두 타입만 지원한다.

* Local Project
* Linear Project

GitHub Issues, Notion, Jira 연동은 후순위다.

---

# 8.3 Linear 연동 기능

## 목적

Linear를 쓰는 사용자가 별도 To-Do를 중복 관리하지 않고, 기존 issue를 SideQuest의 Quest로 사용할 수 있게 한다.

Linear의 public API는 GraphQL 기반이고, Webhook으로 데이터 변경 이벤트를 받을 수 있다. OAuth 2.0은 Linear 앱 연동 시 권장되는 인증 방식이다. ([Linear][1])

## 기능 목록

### A. Linear 연결

* Linear OAuth 연결
* Access token 저장
* Refresh token 처리
* 연결 해제
* 연결 상태 확인

### B. Linear 데이터 가져오기

가져올 대상:

* Workspace
* Team
* Project
* Issue
* Label
* Workflow State
* Assignee
* Estimate
* Priority

### C. Quest 변환

Linear Issue를 SideQuest Quest로 변환한다.

| Linear Issue 필드 | SideQuest Quest 필드  |
| --------------- | ------------------- |
| id              | sourceIssueId       |
| title           | title               |
| description     | description         |
| state           | status              |
| assignee        | assignee            |
| priority        | priority            |
| estimate        | difficulty / xpBase |
| labels          | questType           |
| project         | world               |
| team            | party               |
| createdAt       | createdAt           |
| updatedAt       | sourceUpdatedAt     |
| completedAt     | completedAt         |

### D. 완료 상태 감지

Linear의 issue status는 팀별 workflow에 따라 달라지므로, SideQuest는 단순히 status 이름만 보지 않고 `Done 계열 상태`를 매핑해야 한다. Linear의 기본 workflow는 Backlog, Todo, In Progress, Done, Canceled 형태지만, status는 팀별로 설정될 수 있다. ([Linear][2])

처리 방식:

```text
Linear Workflow State
→ State Type 확인
→ Done 계열이면 Quest Clear 처리
```

### E. SideQuest에서 Linear 업데이트

선택 기능이다.

MVP에서는 다음 방식 권장:

| 동작                             | MVP 정책 |
| ------------------------------ | ------ |
| Linear issue 조회                | 지원     |
| Linear issue 완료 감지             | 지원     |
| SideQuest에서 Linear issue 완료 처리 | 선택     |
| Linear issue 생성                | 미지원    |
| Linear issue 제목/설명 수정          | 미지원    |
| Linear issue 삭제                | 미지원    |

권장 정책:

> MVP에서는 Linear를 “읽기 중심”으로 사용한다.
> SideQuest에서 완료 버튼을 누르면 Linear의 status를 Done으로 바꾸는 기능은 V1.5 또는 옵션으로 제공한다.

---

# 8.4 Linear 동기화 정책

## 동기화 방식

### 1단계: 최초 전체 동기화

사용자가 Linear 프로젝트를 연결하면 다음 데이터를 가져온다.

```text
Workspace
→ Team
→ Project
→ Issue
→ Workflow State
```

### 2단계: 주기적 동기화

Webhook 실패에 대비해 일정 주기로 재동기화한다.

예:

```text
매 10분 또는 사용자가 접속할 때 동기화
```

### 3단계: Webhook 기반 실시간 업데이트

Linear Webhook으로 issue 생성/수정/삭제 이벤트를 받아 내부 Quest를 갱신한다. Linear Webhook은 데이터가 생성, 수정, 삭제될 때 HTTP push notification을 받을 수 있게 해준다. ([Linear][3])

## 동기화 우선순위

Linear-sourced Quest의 원본은 Linear다.

```text
Linear Issue = Source of Truth
SideQuest Quest = Game Projection
```

즉, Linear와 SideQuest의 상태가 충돌하면 기본적으로 Linear를 우선한다.

## 충돌 처리

| 상황                              | 처리                      |
| ------------------------------- | ----------------------- |
| Linear에서 issue 제목 변경            | SideQuest Quest 제목 업데이트 |
| Linear에서 issue 삭제               | SideQuest에서 archived 처리 |
| Linear에서 Done 처리                | XP 지급                   |
| SideQuest에서 완료 처리               | 옵션에 따라 Linear 업데이트      |
| 이미 XP 지급된 issue가 다시 Done 이벤트 수신 | 중복 지급 방지                |
| Done이 취소됨                       | XP 회수하지 않음 권장           |

## XP 중복 지급 방지

중요하다.

Quest별로 `rewardClaimedAt`을 둔다.

```text
if quest.status == "cleared" and rewardClaimedAt == null:
    grantXP()
    rewardClaimedAt = now()
```

## Linear 동기화 구현 목표

MVP 구현 순서:

1. Linear OAuth 연결
2. 프로젝트 목록 조회
3. issue 목록 조회
4. issue → quest 변환
5. Done 상태 감지
6. XP 지급
7. 수동 새로고침
8. Webhook 연동
9. SideQuest에서 Linear 완료 처리

---

# 8.5 자체 To-Do 기능

## 목적

Linear를 쓰지 않는 사용자도 SideQuest를 사용할 수 있게 한다.

## 원칙

자체 To-Do는 Linear보다 더 가벼워야 한다.

즉, 다음 기능은 넣지 않는다.

* 복잡한 sprint
* roadmap
* issue relation
* dependency graph
* 복잡한 권한
* 자동화 rule
* 고급 필터

## 기능 목록

### Local Quest CRUD

* 퀘스트 생성
* 퀘스트 수정
* 퀘스트 삭제
* 퀘스트 완료
* 퀘스트 재오픈
* 퀘스트 우선순위 설정
* 퀘스트 난이도 설정
* 퀘스트 마감일 설정
* 퀘스트 타입 설정

## Local Quest 필드

| 필드          | 설명                                |
| ----------- | --------------------------------- |
| title       | 퀘스트 제목                            |
| description | 설명                                |
| status      | todo / in_progress / done         |
| difficulty  | easy / normal / hard / boss       |
| dueDate     | 마감일                               |
| questType   | main / side / daily / bug / chore |
| xpReward    | 지급 XP                             |
| assignee    | 담당자                               |
| createdAt   | 생성일                               |
| completedAt | 완료일                               |

## 자체 To-Do 구현 목표

MVP에서 반드시 포함한다.

이유:

* Linear 미사용자도 진입 가능
* 개인 사이드 프로젝트에 적합
* API 연동 없이 바로 데모 가능
* 사용자 모집에 유리
* 게임 루프 검증 가능

---

# 8.6 Quest 시스템

## Quest 타입

| 타입          | 설명     | 예시        |
| ----------- | ------ | --------- |
| Main Quest  | 핵심 작업  | 로그인 구현    |
| Side Quest  | 부가 작업  | 버튼 색상 수정  |
| Daily Quest | 반복 작업  | 오늘 커밋하기   |
| Bug Quest   | 버그 수정  | 모바일 깨짐 수정 |
| Chore Quest | 잡무     | README 정리 |
| Boss Quest  | 큰 마일스톤 | MVP 배포    |

## Quest 상태

```text
locked
todo
in_progress
done
archived
canceled
```

## Quest 난이도

| 난이도    |  XP |
| ------ | --: |
| Easy   |  10 |
| Normal |  30 |
| Hard   |  70 |
| Boss   | 150 |

Linear 연동 시 estimate가 있으면 estimate 기반으로 XP를 계산한다.

## 구현 목표

MVP에서는 다음까지만 구현한다.

* Quest 목록
* Quest 생성
* Quest 완료
* Quest 상태 표시
* XP 지급
* Linear issue 변환

---

# 8.7 XP / 레벨 시스템

## 목적

작업 완료에 명확한 보상을 제공한다.

## 기본 XP 계산식

```text
XP = 기본 XP + 난이도 보정 + 우선순위 보정 + streak 보너스
```

## MVP 계산식

초기에는 단순하게 간다.

```text
XP = difficultyXP
```

| Difficulty |  XP |
| ---------- | --: |
| Easy       |  10 |
| Normal     |  30 |
| Hard       |  70 |
| Boss       | 150 |

## Linear estimate 기반 XP

| Linear Estimate |  XP |
| --------------- | --: |
| 없음              |  20 |
| 1               |  10 |
| 2               |  20 |
| 3               |  40 |
| 5               |  80 |
| 8               | 130 |

## 레벨업 공식

```text
requiredXP = 100 + level * 50
```

예:

| Level | Required XP |
| ----- | ----------: |
| 1 → 2 |         150 |
| 2 → 3 |         200 |
| 3 → 4 |         250 |
| 4 → 5 |         300 |

## 구현 목표

MVP에서는 다음을 구현한다.

* XP 누적
* 레벨업
* 레벨업 애니메이션
* 최근 XP 획득 로그
* Quest별 XP 지급 기록
* 중복 지급 방지

---

# 8.8 펫 시스템

## 목적

펫은 단순 장식이 아니다.

펫은 다음 역할을 가진다.

| 역할          | 설명                    |
| ----------- | --------------------- |
| 프로젝트 상태 표시기 | 프로젝트가 잘 진행되는지 감정으로 표현 |
| 보상 대상       | XP를 먹고 성장             |
| 팀 소셜 오브젝트   | 팀 전체가 함께 키우는 존재       |
| 리텐션 장치      | 방치하면 슬퍼지고, 진행하면 회복    |
| 브랜드 정체성     | SideQuest의 핵심 캐릭터     |

## 펫 생성 방식

중요한 결정:

> 펫 생성은 AI에 의존하지 않는다.

운영자가 API 비용을 감당하고 싶지 않으므로, MVP의 펫은 **프리셋 픽셀 아트 기반**으로 생성한다.

## 펫 생성 플로우

```text
1. 프로젝트 생성
2. 펫 종족 선택
3. 색상 선택
4. 성격 선택
5. 이름 입력
6. 알 생성
7. 첫 퀘스트 완료 시 부화
```

## 펫 종족 예시

| 종족      | 특징            |
| ------- | ------------- |
| Hamster | 귀여움, 기본형      |
| Slime   | 단순하고 애니메이션 쉬움 |
| Dragon  | 성장감 강함        |
| Robot   | 개발 프로젝트와 잘 맞음 |
| Cat     | 대중적           |
| Ghost   | 방치 상태 표현 쉬움   |

## 펫 성장 단계

| 단계        | 조건         |
| --------- | ---------- |
| Egg       | 프로젝트 생성 직후 |
| Baby      | 첫 퀘스트 완료   |
| Child     | Level 3    |
| Teen      | Level 7    |
| Adult     | Level 15   |
| Legendary | 특정 조건 달성   |

## 펫 외형 변화

외형 변화 조건:

* 레벨
* 완료한 Boss Quest 수
* 프로젝트 streak
* 특정 타입 퀘스트 완료 수
* 팀 전체 기여도
* 시즌 이벤트

## 구현 목표

MVP에서는 다음까지만 구현한다.

* 펫 1종
* 알 상태
* 부화 상태
* 레벨별 2~3단계 외형 변화
* 감정 상태 3개
* 간단한 idle 애니메이션

---

# 8.9 Mood 상태 시스템

## 목적

프로젝트 상태를 펫의 감정으로 표현한다.

## Mood 종류

| Mood      | 조건             | 표현     |
| --------- | -------------- | ------ |
| Happy     | 최근 완료 있음       | 웃음, 점프 |
| Idle      | 평상시            | 서 있음   |
| Sleepy    | 활동 부족          | 졸림     |
| Hungry    | 퀘스트는 많지만 완료 없음 | 배고픔    |
| Sick      | 장기 방치          | 아픔     |
| Panic     | 마감 임박 + 미완료 많음 | 당황     |
| Celebrate | 마일스톤 완료        | 축하     |

## MVP Mood

MVP에서는 4개만 구현한다.

```text
Happy
Idle
Sleepy
Celebrate
```

## Mood 계산 예시

```text
if milestoneCompletedToday:
    mood = "celebrate"
else if completedQuestWithin24h:
    mood = "happy"
else if noActivityFor3Days:
    mood = "sleepy"
else:
    mood = "idle"
```

## 구현 목표

* Mood 계산 함수
* Mood별 sprite 표시
* Mood별 대사 출력
* 방치 기준 설정
* 완료 시 즉시 Happy/Celebrate 전환

---

# 8.10 펫 인터랙션

## 가능한 인터랙션

| 기능     | 설명               | 우선순위   |
| ------ | ---------------- | ------ |
| 쓰다듬기   | 클릭하면 반응          | MVP 가능 |
| 먹이 주기  | 완료 보상으로 얻은 먹이 사용 | V2     |
| 대화하기   | 현재 상태에 따라 대사 출력  | MVP    |
| 방 꾸미기  | 배경/아이템 배치        | V2     |
| 산책     | 프로젝트 월드맵 이동      | V3     |
| 스킨 변경  | 외형 커스터마이징        | V2     |
| 트로피 보기 | 달성한 업적 표시        | V2     |

## MVP 인터랙션

* 펫 클릭 시 반응
* 현재 상태 대사 표시
* 레벨업 시 애니메이션
* 퀘스트 완료 시 점프/축하

---

# 8.11 BYOK / AI 기능

## 기본 원칙

운영자가 API 비용을 부담하지 않는다.

따라서 AI 기능은 다음 중 하나로만 제공한다.

1. 아예 사용하지 않음
2. 사용자가 직접 API 키를 등록하는 BYOK 방식

## 중요한 분리

펫 생성과 AI 생성은 다르다.

```text
펫 생성 = 게임 자산 기반
AI 생성 = 선택적 부가 기능
```

따라서 BYOK가 없어도 펫 생성은 가능하다.

## BYOK 사용처

| 기능        | 설명                       | 우선순위 |
| --------- | ------------------------ | ---- |
| 펫 이름 추천   | 프로젝트 설명 기반 이름 추천         | V2   |
| 펫 성격 생성   | 자연어 기반 성격 생성             | V2   |
| 펫 대사 생성   | 상태별 대사 생성                | V2   |
| 퀘스트 문구 변환 | “로그인 구현” → “인증의 관문을 열어라” | V2   |
| 회고 요약     | 이번 주 완료한 퀘스트 요약          | V2   |
| 이미지 생성    | 커스텀 펫 이미지 생성             | V3   |

## BYOK 저장 정책

권장 MVP 이후 구조:

| 방식          | 설명                         |
| ----------- | -------------------------- |
| 브라우저 저장     | Local Storage 또는 IndexedDB |
| 서버 저장 안 함   | 심리적 저항 완화                  |
| 키 표시 제한     | 입력 후 마스킹                   |
| 삭제 기능       | 즉시 삭제 가능                   |
| Provider 선택 | OpenAI / OpenRouter 등      |

## BYOK 관련 문구

사용자에게 다음을 명확히 안내한다.

> API 키는 서버에 저장하지 않고 브라우저에만 저장됩니다.
> AI 기능을 사용할 때만 사용되며, SideQuest 운영자는 사용자의 API 비용을 부담하지 않습니다.

## MVP 정책

MVP에서는 BYOK를 제외한다.

이유:

* 핵심 게임 루프 검증이 우선
* API 키 입력은 사용자 진입 장벽
* 보안 안내 비용 증가
* AI 없이도 펫 성장과 퀘스트 게임화 가능

---

# 8.12 게임 UI / UX

## 목표

SideQuest는 “일반 웹앱에 픽셀 스킨을 씌운 것”이 아니어야 한다.

목표는 다음이다.

> 사용자가 웹사이트에 들어왔는데, 프로젝트 관리 화면이 아니라 작은 RPG 게임에 접속한 느낌을 받게 한다.

## UI 구성 원칙

### 1. RPG 대시보드

일반적인 카드형 SaaS 대시보드보다 RPG 메뉴처럼 구성한다.

예:

```text
┌────────────────────────────┐
│ Guild: SSU Hamster Lovers  │
├────────────────────────────┤
│ World: Battle Hamsters     │
│ Progress: █████░░░ 62%     │
│ Pet Lv. 7 Hamster          │
└────────────────────────────┘
```

### 2. Quest Board

To-Do 리스트가 아니라 퀘스트 보드처럼 보이게 한다.

* Main Quest
* Side Quest
* Daily Quest
* Boss Quest

### 3. Pet Room

펫이 있는 방이다.

표시 요소:

* 펫
* 배경
* XP Bar
* Mood
* 최근 완료 퀘스트
* 대사창

### 4. Reward Popup

퀘스트 완료 시:

```text
Quest Clear!
+70 XP
Pet gained a level!
New mood unlocked: Excited
```

### 5. 픽셀 아트 톤

* 16-bit RPG 스타일
* 낮은 해상도 sprite
* pixel border
* 대화창
* chunky button
* tile map background
* 작은 사운드 효과

## 화면 목록

| 화면              | 설명        | MVP |
| --------------- | --------- | --- |
| Landing         | 제품 소개     | 포함  |
| Login           | 로그인       | 포함  |
| Project Select  | 프로젝트 선택   | 포함  |
| Project Create  | 프로젝트 생성   | 포함  |
| Linear Connect  | Linear 연결 | 포함  |
| Quest Board     | 퀘스트 목록    | 포함  |
| Pet Room        | 펫 상세 화면   | 포함  |
| Reward Modal    | 보상 팝업     | 포함  |
| Settings        | 설정        | 최소  |
| BYOK Settings   | API 키 설정  | V2  |
| Inventory       | 아이템       | V2  |
| Guild Dashboard | 팀 대시보드    | V2  |
| World Map       | 프로젝트 월드맵  | V3  |

---

# 8.13 대사 시스템

## 목적

펫에 생명감을 부여한다.

## MVP 방식

AI 없이 프리셋 대사를 사용한다.

예:

| Mood      | 대사                 |
| --------- | ------------------ |
| Happy     | “오늘도 퀘스트를 클리어했어!”  |
| Idle      | “다음 퀘스트를 기다리고 있어.” |
| Sleepy    | “며칠째 조용하네… 졸려.”    |
| Celebrate | “보스 퀘스트 클리어! 대단해!” |

## V2 방식

BYOK를 사용해 대사를 생성한다.

예:

```text
프로젝트 이름: Battle Hamsters
최근 완료: 무기 시스템 구현
펫 성격: 까칠하지만 충성스러움

생성 대사:
“흥, 이번 무기 시스템은 꽤 봐줄 만하네. 다음 퀘스트도 빨리 가져와.”
```

---

# 8.14 업적 시스템

## 목적

작업 누적에 장기 보상을 부여한다.

## 업적 예시

| 업적               | 조건               |
| ---------------- | ---------------- |
| First Quest      | 첫 퀘스트 완료         |
| 3-Day Streak     | 3일 연속 완료         |
| Bug Hunter       | Bug Quest 10개 완료 |
| Boss Slayer      | Boss Quest 완료    |
| Project Survivor | 30일 이상 프로젝트 유지   |
| Night Owl        | 밤 시간대 퀘스트 완료     |
| Team Spirit      | 팀원 전원이 1회 이상 기여  |

## MVP 정책

MVP에서는 업적 시스템을 구현하지 않아도 된다.

단, 데이터 모델에는 확장 가능성을 남긴다.

---

# 9. 데이터 모델

## 9.1 User

```ts
type User = {
  id: string
  email: string
  displayName: string
  createdAt: Date
  updatedAt: Date
}
```

## 9.2 Workspace

```ts
type Workspace = {
  id: string
  name: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}
```

## 9.3 Project

```ts
type Project = {
  id: string
  workspaceId: string
  name: string
  description?: string
  sourceType: "local" | "linear"
  linearProjectId?: string
  linearTeamId?: string
  createdAt: Date
  updatedAt: Date
}
```

## 9.4 Quest

```ts
type Quest = {
  id: string
  projectId: string
  sourceType: "local" | "linear"
  sourceIssueId?: string

  title: string
  description?: string

  status: "todo" | "in_progress" | "done" | "archived" | "canceled"
  questType: "main" | "side" | "daily" | "bug" | "chore" | "boss"
  difficulty: "easy" | "normal" | "hard" | "boss"

  priority?: number
  estimate?: number
  xpReward: number

  assigneeId?: string
  dueDate?: Date

  completedAt?: Date
  rewardClaimedAt?: Date

  sourceUpdatedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

## 9.5 Pet

```ts
type Pet = {
  id: string
  projectId: string

  name: string
  species: "hamster" | "slime" | "dragon" | "robot" | "cat" | "ghost"
  colorVariant: string
  personality: string

  level: number
  currentXP: number
  totalXP: number

  evolutionStage: "egg" | "baby" | "child" | "teen" | "adult" | "legendary"
  mood: "idle" | "happy" | "sleepy" | "hungry" | "sick" | "panic" | "celebrate"

  createdAt: Date
  updatedAt: Date
}
```

## 9.6 XP Log

```ts
type XPLog = {
  id: string
  projectId: string
  petId: string
  questId: string

  amount: number
  reason: "quest_clear" | "streak_bonus" | "boss_clear" | "manual_adjustment"

  createdAt: Date
}
```

## 9.7 Linear Integration

```ts
type LinearIntegration = {
  id: string
  workspaceId: string
  userId: string

  linearWorkspaceId: string
  accessTokenEncrypted: string
  refreshTokenEncrypted?: string

  connectedAt: Date
  revokedAt?: Date
  updatedAt: Date
}
```

## 9.8 Webhook Event

```ts
type WebhookEvent = {
  id: string
  provider: "linear"
  externalEventId?: string
  eventType: string
  payload: unknown
  processedAt?: Date
  createdAt: Date
}
```

---

# 10. 기술 구조

## 10.1 추천 스택

| 영역          | 기술                               |
| ----------- | -------------------------------- |
| Frontend    | Next.js                          |
| UI          | Tailwind CSS                     |
| Backend     | Next.js Route Handlers 또는 별도 API |
| DB          | Supabase Postgres                |
| Auth        | Supabase Auth                    |
| ORM         | Prisma 또는 Drizzle                |
| Integration | Linear GraphQL API               |
| Webhook     | Next.js API Route                |
| Asset       | Pixel sprite sheets              |
| Deployment  | Vercel                           |
| Storage     | Supabase Storage                 |

## 10.2 전체 아키텍처

```text
Browser
  ↓
Next.js Web App
  ↓
API Layer
  ├─ Local Quest Service
  ├─ Linear Integration Service
  ├─ XP Engine
  ├─ Pet State Machine
  └─ Reward Service
  ↓
Postgres
```

## 10.3 Linear 연동 구조

```text
Linear OAuth
  ↓
Store Token
  ↓
Fetch Projects / Issues via GraphQL
  ↓
Normalize Issues to Quests
  ↓
Display Quest Board
  ↓
Webhook receives updates
  ↓
Update Quest state
  ↓
Grant XP if completed
```

---

# 11. 구현 목표

## 11.1 MVP 목표

MVP의 목표는 명확하다.

> 사용자가 프로젝트를 만들고, 퀘스트를 완료하면, 픽셀 펫이 XP를 얻고 성장하는 경험을 제공한다.

Linear 연동까지 포함한 MVP 목표:

> Linear 프로젝트를 연결하면 issue가 퀘스트로 보이고, 완료된 issue에 따라 펫이 성장한다.

## 11.2 MVP 범위

### 반드시 포함

* 로그인
* 프로젝트 생성
* Local Quest 생성/완료
* Linear OAuth 연결
* Linear Project 선택
* Linear Issue 가져오기
* Issue → Quest 변환
* Done 상태 감지
* XP 지급
* 펫 생성
* 펫 레벨업
* 펫 Mood 변경
* Quest Board
* Pet Room
* 보상 팝업
* 픽셀풍 UI

### 제외

* BYOK
* AI 이미지 생성
* 팀 초대
* 아이템
* 인벤토리
* 업적
* 월드맵
* 랭킹
* GitHub 연동
* Slack/Discord 연동
* 복잡한 Linear issue 수정

---

# 12. 단계별 구현 계획

## Phase 0: 기획 / 디자인 확정

목표:

* 컨셉 확정
* 화면 목록 확정
* 데이터 모델 확정
* 픽셀 UI 방향 확정

산출물:

* PRODUCT.md
* FEATURE_SPEC.md
* DATA_MODEL.md
* UI_WIREFRAME.md

---

## Phase 1: Local To-Do 기반 게임 루프

목표:

> Linear 없이도 SideQuest의 핵심 재미를 검증한다.

구현 기능:

* 로그인
* 프로젝트 생성
* 펫 생성
* 퀘스트 CRUD
* 퀘스트 완료
* XP 지급
* 펫 레벨업
* Mood 변경
* Reward modal
* Pet Room

완료 기준:

```text
사용자가 퀘스트를 만들고 완료하면 펫이 성장한다.
```

---

## Phase 2: Linear 읽기 연동

목표:

> Linear issue를 SideQuest Quest로 볼 수 있게 한다.

구현 기능:

* Linear OAuth
* Team 조회
* Project 조회
* Issue 조회
* Issue → Quest 변환
* 수동 동기화
* Done issue XP 지급

완료 기준:

```text
Linear 프로젝트를 연결하면 issue 목록이 퀘스트 보드에 표시된다.
```

---

## Phase 3: Webhook 동기화

목표:

> Linear 변경 사항이 SideQuest에 자동 반영된다.

구현 기능:

* Linear Webhook endpoint
* Webhook signature 검증
* issue update 처리
* issue completed 처리
* XP 중복 지급 방지
* webhook event log

완료 기준:

```text
Linear에서 issue를 Done으로 바꾸면 SideQuest 펫이 XP를 얻는다.
```

---

## Phase 4: 게임 UI 고도화

목표:

> 일반 SaaS가 아니라 픽셀 RPG처럼 보이게 한다.

구현 기능:

* 픽셀 스타일 대시보드
* 퀘스트 보드 개선
* 펫 방 개선
* sprite animation
* level-up animation
* quest clear animation
* sound effect
* mood dialogue

완료 기준:

```text
처음 보는 사용자가 “To-Do 앱”보다 “게임 같다”고 느낀다.
```

---

## Phase 5: V2 기능

구현 후보:

* BYOK
* AI 대사 생성
* 퀘스트 RPG 문구 변환
* 인벤토리
* 아이템
* 펫 스킨
* 팀 초대
* 업적
* streak
* 주간 리포트

---

# 13. 상세 기능 우선순위

## P0: 핵심 생존 기능

| 기능           | 설명                |
| ------------ | ----------------- |
| 프로젝트 생성      | 사용자가 게임화할 프로젝트 생성 |
| 퀘스트 생성/완료    | Local To-Do       |
| XP 지급        | 완료 보상             |
| 펫 성장         | 핵심 보상             |
| Pet Room     | 펫 확인              |
| Quest Board  | 작업 확인             |
| Reward Popup | 완료 피드백            |

## P1: Linear 핵심 연동

| 기능           | 설명                |
| ------------ | ----------------- |
| Linear OAuth | 계정 연결             |
| Project 선택   | 어떤 프로젝트를 게임화할지 선택 |
| Issue 조회     | Linear 데이터 가져오기   |
| Done 감지      | 완료 상태 확인          |
| XP 지급        | 완료 issue 보상       |
| 수동 동기화       | 새로고침              |

## P2: 자동화 / 몰입 개선

| 기능               | 설명          |
| ---------------- | ----------- |
| Webhook          | 자동 동기화      |
| Mood 상태          | 프로젝트 상태 감정화 |
| Sprite animation | 생동감         |
| Streak           | 지속 동기       |
| 레벨업 연출           | 보상 강화       |

## P3: 확장 기능

| 기능        | 설명        |
| --------- | --------- |
| BYOK      | 사용자 API 키 |
| AI 대사     | 펫 생명감     |
| 아이템       | 보상 다양화    |
| 업적        | 장기 목표     |
| 팀 기능      | 협업 강화     |
| GitHub 연동 | 개발팀 확장    |

---

# 14. 핵심 정책 결정

## 14.1 PM 기능 범위

결정:

> SideQuest는 Linear보다 더 경량이어야 한다.

자체 To-Do는 다음 정도만 제공한다.

* 제목
* 설명
* 상태
* 난이도
* 마감일
* 타입

그 이상은 Linear로 넘긴다.

## 14.2 Linear 데이터 권한

결정:

> Linear-sourced Quest는 Linear가 원본이다.

SideQuest는 기본적으로 투영된 게임 데이터만 관리한다.

## 14.3 XP 회수 정책

결정 권장:

> 이미 지급된 XP는 회수하지 않는다.

이유:

* 사용자가 Linear 상태를 잘못 바꿨을 때 경험치가 출렁이면 불쾌하다.
* 게임에서는 보상 회수가 매우 부정적인 경험이다.
* 중복 지급만 막으면 충분하다.

## 14.4 BYOK 정책

결정:

> MVP에서는 BYOK를 넣지 않는다.
> AI 없이 프리셋 펫과 대사로 구현한다.

V2에서 BYOK를 넣는다.

## 14.5 펫 생성 정책

결정:

> 펫은 AI 생성물이 아니라 게임 자산이다.

AI는 이름, 대사, 설명, 퀘스트 문구를 꾸미는 선택 기능이다.

---

# 15. 리스크

## 15.1 기능 범위 폭발

위험:

* PM 툴을 다시 만들게 될 수 있음
* Linear와 경쟁하게 됨
* 개발량 폭증

대응:

* 자체 To-Do는 초경량 유지
* 고급 관리는 Linear로 유도
* SideQuest는 게임화에 집중

## 15.2 게임성이 약할 위험

위험:

* 단순히 예쁜 To-Do가 될 수 있음
* 펫이 장식으로 전락할 수 있음

대응:

* XP, Mood, Evolution을 핵심 루프에 연결
* 완료할 때마다 즉각적인 보상 제공
* 방치 상태를 명확히 표현

## 15.3 Linear 연동 복잡성

위험:

* OAuth
* Token refresh
* Webhook 처리
* 상태 매핑
* 팀별 workflow 차이

대응:

* Phase 1에서는 Local To-Do 먼저 구현
* Phase 2에서 읽기 연동
* Phase 3에서 Webhook
* Linear status는 state type 기준으로 매핑

## 15.4 BYOK 진입 장벽

위험:

* 사용자가 API 키 입력을 불안해할 수 있음
* 키 유출 우려
* 설정 과정 복잡

대응:

* MVP에서 제외
* AI 없이도 핵심 기능 완성
* V2에서 선택 기능으로 제공
* 서버 저장 안 함을 명확히 고지

## 15.5 운영 비용

위험:

* AI API 비용
* 이미지 생성 비용
* 저장소 비용

대응:

* AI 기본 미사용
* BYOK 기반
* 프리셋 asset 사용
* Vercel/Supabase 무료 또는 저비용 구조

---

# 16. 성공 기준

## MVP 성공 기준

정량:

* 사용자가 프로젝트 1개 이상 생성
* 퀘스트 5개 이상 생성 또는 동기화
* 퀘스트 3개 이상 완료
* 펫 레벨업 1회 이상 경험
* 다음날 재방문

정성:

* “할 일 앱”보다 “게임 같다”는 반응
* 펫에 애착을 느낀다는 반응
* Linear를 쓰지 않아도 써볼 수 있다는 반응
* 작업 완료가 더 기분 좋다는 반응

## 핵심 검증 질문

1. 사용자는 퀘스트 완료 후 보상을 기대하는가?
2. 펫이 성장하는 것이 실제 동기부여가 되는가?
3. Linear 연동이 없어도 제품 가치가 있는가?
4. Linear 연동이 있으면 중복 관리 부담이 줄어드는가?
5. 픽셀 게임 UI가 단순 장식이 아니라 경험을 바꾸는가?

---

# 17. 최종 MVP 정의

SideQuest MVP는 다음 한 문장으로 정의한다.

> 사용자가 Local To-Do 또는 Linear issue를 퀘스트로 관리하고, 완료할 때마다 프로젝트 펫이 XP를 얻고 성장하는 픽셀 RPG형 생산성 웹앱.

MVP에서 반드시 보여줘야 하는 경험은 이것이다.

```text
퀘스트 완료
→ 보상 팝업
→ XP 상승
→ 펫 반응
→ 레벨업 또는 Mood 변화
→ 다시 퀘스트를 하고 싶어짐
```

---

# 18. 최종 구현 목표 요약

## 1차 구현 목표

* Next.js 웹앱
* Local To-Do
* 프로젝트 생성
* 프리셋 펫 생성
* XP/레벨 시스템
* Mood 시스템
* 픽셀풍 UI

## 2차 구현 목표

* Linear OAuth
* Linear issue 동기화
* issue 완료 감지
* XP 지급
* Linear 기반 Quest Board

## 3차 구현 목표

* Linear Webhook
* 자동 동기화
* 펫 애니메이션 강화
* Streak
* 업적
* 보상 시스템

## 4차 구현 목표

* BYOK
* AI 대사 생성
* 퀘스트 RPG 문구 변환
* 커스텀 펫 설명 생성
* 팀 기능

---

# 19. 핵심 설계 원칙

SideQuest를 개발할 때 지켜야 할 원칙은 다음이다.

1. **PM 툴을 다시 만들지 않는다.**
2. **Linear 사용자는 Linear를 계속 쓰게 한다.**
3. **Linear 미사용자는 초경량 To-Do만 제공한다.**
4. **펫은 장식이 아니라 프로젝트 상태의 아바타다.**
5. **AI는 핵심이 아니라 선택 기능이다.**
6. **운영자가 AI 비용을 부담하지 않는다.**
7. **완료 보상은 즉각적이어야 한다.**
8. **UI는 일반 SaaS가 아니라 픽셀 RPG처럼 보여야 한다.**
9. **MVP는 Local To-Do만으로도 재미가 있어야 한다.**
10. **Linear 연동은 게임 레이어를 강화하는 수단이다.**

[1]: https://linear.app/docs/api-and-webhooks?utm_source=chatgpt.com "API and Webhooks – Linear Docs"
[2]: https://linear.app/docs/configuring-workflows?utm_source=chatgpt.com "Issue status – Linear Docs"
[3]: https://linear.app/developers/webhooks?utm_source=chatgpt.com "Webhooks – Linear Developers"
