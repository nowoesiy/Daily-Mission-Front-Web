# ![logo 74f7f9d7](https://user-images.githubusercontent.com/39932233/80936920-056df500-8e0e-11ea-8a57-2cf418edd852.png)

> 1일 1미션 인증 및 공유 웹 어플리케이션

[Daily-Mission](https://daily-mission.com)은 커뮤니티 기반의 미션 공유 플랫폼 입니다.

원하는 미션에 참여하여 매일 미션을 완료하고, 참여자들과 완료된 미션을 공유해 볼 수 있습니다.

![mission](https://user-images.githubusercontent.com/39932233/80935943-f6854380-8e09-11ea-85b9-b41e78390b92.jpg)
## 주요 기능

- 미션생성
- 미션글 업로드
- 미션 별 인증글 확인
- 개인 별 인증글 확인
- 전체 인증글 확인
- 미션 참여자 및 강퇴자 확인

## 프로젝트 개요

해당 프로젝트는 React(프론트엔드) + Spring Boot(백엔드) 구조로 이루어져 있습니다.

저는 이 중 프론트엔드 개발을 담당하였으며, 이후의 서술은 프론트 개발에 관한 것을 다룹니다.

## 기술 스택

- JavaScript
- React
- React Router v4
- Redux
- Redux-thunk
- Sass

## 이외 사용 기술

- 스크롤 페이징
- axios
- JWT

## LazyLoading & Scroll Paging
> 프로그레시브 렌더링을 통한 리소스 최적화

![Lazy & scroll paging](https://user-images.githubusercontent.com/39932233/83599253-a6cf9e80-a5a6-11ea-9b07-f5c03654ba08.gif)

레이지 로딩을 사용하여 사용자의 화면에 이미지가 감지 되었을 때 로딩이 되도록 구현하였습니다.

이와 더불어, 스크롤 페이징을 이용하여 사용자 경험을 극대화하고 모바일에 최적화 된 페이지를 만들었습니다.

```
export function lazyLoad() {
  const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entires, observer) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          let image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove('lazy');
          io.unobserve(image);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      io.observe(lazyImage);
    });
  }
}

```
두 기능 모두 IntersectionObserver 객체를 이용하여 image 파일을 observe하는 방식으로 구현하였습니다.

## JWT
> Oauth 2.0 인증을 위한 JWT

Bearer Authentication를 통해 User 인증을 구현하였습니다.

```
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
```

## UI/UX

### 1. 로그인

> 구글/깃허브/네이버로 로그인을 할 수 있습니다.

<img src="https://image.daily-mission.com/README/login.png"></img>

### 2. 사용자 정보 변경

> 로그인 후 사용자 이름 / 이미지를 변경할 수 있습니다.

<img src="https://image.daily-mission.com/README/change.png"></img>

### 3. 홈

> 참여자가 많은 미션과 신규 생성된 미션을 조회 할 수 있습니다.

<img src="https://image.daily-mission.com/README/home.png"></img>

### 4. 전체 미션

> 종료된 미션을 포함해 전체 미션을 조회 할 수 있습니다.

<img src="https://image.daily-mission.com/README/all.png"></img>

### 5. 미션 디테일

> 미션 디테일 정보를 확인할 수 있습니다. 또한, 현재 참여중인 사용자와 해당 미션에 제출된 포스트 목록을 조회 할 수 있습니다.

<img src="https://image.daily-mission.com/README/detail.png"></img>

### 6. 미션 참여

> 미션 생성후 전달받은 참여코드를 입력해 미션에 참여할 수 있습니다.

<img src="https://image.daily-mission.com/README/attend.png"></img>

### 7. 포스팅 목록

> 전체 인증 포스트 목록을 조회할 수 있습니다.

<img src="https://image.daily-mission.com/README/post.png"></img>

### 8. 내 미션 목록

> 내가 참여중인 미션 목록과 제출한 포스트 목록을 조회할 수 있습니다. 강퇴당한 미션에는 입장할 수 없습니다.

<img src="https://image.daily-mission.com/README/my.png"></img>

### 9. 인증 포스트 History

> 참여중인 미션의 Weekly 포스트 History를 조회할 수 있습니다.

<img src="https://image.daily-mission.com/README/submit.png"></img>

제출 완료 후에는 아래와 같이 화면이 변경됩니다.

<img src="https://image.daily-mission.com/README/submit_success.png"></img>

### 10. 포스트 제출

> 제목/내용/사진을 입력해 인증 포스트를 작성합니다.

<img src="https://image.daily-mission.com/README/post_submit.png"></img>
