import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

// const posts = [
//   {
//     postId: 79,
//     missionId: 52,
//     missionTitle: '1일 1알고리즘',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200323]Find the Difference',
//     content:
//       '링크: https://leetcode.com/problems/find-the-difference/\n\n\n설명: 주어진 두 string 값중 다른 부분의 char 값을 구하는 문제\n\n사용 언어: C++\n\n난이도 : ★★☆☆☆',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/23/202003231431_image%20%286%29.png',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/23/202003231431_image%20%286%29_400_880.png',
//     modifiedDate: '2020-03-23T14:31:24.818',
//   },
//   {
//     postId: 78,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '200323 URL',
//     content: '08:52 도착완료',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/23/202003231414_KakaoTalk_20200323_114307323.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/23/202003231414_KakaoTalk_20200323_114307323_400_880.jpg',
//     modifiedDate: '2020-03-23T14:14:55.282',
//   },
//   {
//     postId: 75,
//     missionId: 52,
//     missionTitle: '1일 1알고리즘',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200322] Valid Anagram',
//     content:
//       '설명: 두 string 이 anagram 관계인지 확인하는 문제\n\n사용 언어: C++\n\n난이도: ★★☆☆☆',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/22/202003222241_image%20%284%29.png',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/22/202003222241_image%20%284%29_400_880.png',
//     modifiedDate: '2020-03-22T22:41:19.417',
//   },
//   {
//     postId: 74,
//     missionId: 61,
//     missionTitle: '1DAY 1COMMIT',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200320] Initial Commit',
//     content: '시작합니다!',
//     imageUrl:
//       'https://image.daily-mission.com/1DAY%201COMMIT/2020/03/20/202003201702_%EC%A3%BC%EC%84%9D%202020-03-20%20170133.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1DAY%201COMMIT/2020/03/20/202003201702_%EC%A3%BC%EC%84%9D%202020-03-20%20170133_400_880.jpg',
//     modifiedDate: '2020-03-20T17:02:04.074',
//   },
//   {
//     postId: 73,
//     missionId: 60,
//     missionTitle: '주말마다 영화보기',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '영화 고고',
//     content: '영화봅세',
//     imageUrl:
//       'https://image.daily-mission.com/%EC%A3%BC%EB%A7%90%EB%A7%88%EB%8B%A4%20%EC%98%81%ED%99%94%EB%B3%B4%EA%B8%B0/2020/03/20/202003201638_MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg%40._V1_.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/%EC%A3%BC%EB%A7%90%EB%A7%88%EB%8B%A4%20%EC%98%81%ED%99%94%EB%B3%B4%EA%B8%B0/2020/03/20/202003201638_MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg%40._V1_.jpg',
//     modifiedDate: '2020-03-20T16:38:27.434',
//   },
//   {
//     postId: 72,
//     missionId: 59,
//     missionTitle: '산사모(산을 사랑하는 모임)',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '가자',
//     content: '가자',
//     imageUrl:
//       'https://image.daily-mission.com/%EC%82%B0%EC%82%AC%EB%AA%A8%28%EC%82%B0%EC%9D%84%20%EC%82%AC%EB%9E%91%ED%95%98%EB%8A%94%20%EB%AA%A8%EC%9E%84%29/2020/03/20/202003201630_raise-3338589_960_720.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/%EC%82%B0%EC%82%AC%EB%AA%A8%28%EC%82%B0%EC%9D%84%20%EC%82%AC%EB%9E%91%ED%95%98%EB%8A%94%20%EB%AA%A8%EC%9E%84%29/2020/03/20/202003201630_raise-3338589_960_720_400_880.jpg',
//     modifiedDate: '2020-03-20T16:30:12.957',
//   },
//   {
//     postId: 71,
//     missionId: 58,
//     missionTitle: '1일 1커피',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200320] 오늘의 커피',
//     content: '카페라떼\n\n먹고 힘내자',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%BB%A4%ED%94%BC/2020/03/20/202003201615_KakaoTalk_20200320_161500524.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%BB%A4%ED%94%BC/2020/03/20/202003201615_KakaoTalk_20200320_161500524_400_880.jpg',
//     modifiedDate: '2020-03-20T16:15:37.466',
//   },
//   {
//     postId: 70,
//     missionId: 52,
//     missionTitle: '1일 1알고리즘',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200320] Relative Sort Array',
//     content:
//       '설명: arr1를 arr2을 기준으로 정렬하는 문제\n\n사용 언어: C++\n\n난이도: ★★☆☆☆',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/20/202003201409_image%20%285%29.png',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/20/202003201409_image%20%285%29_400_880.png',
//     modifiedDate: '2020-03-20T14:09:50.925',
//   },
//   {
//     postId: 68,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200320] 시작합니다',
//     content: '갑시다',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/20/202003200859_KakaoTalk_20200320_085903570.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/20/202003200859_KakaoTalk_20200320_085903570_400_880.jpg',
//     modifiedDate: '2020-03-20T08:59:51.374',
//   },
//   {
//     postId: 66,
//     missionId: 52,
//     missionTitle: '1일 1알고리즘',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: ' [200319] Add Digits',
//     content:
//       '설명: 주어진 숫자의 각자리 수를 더하며, 그 값이 한 자리 일때의 값을 리턴 하는 문제 \n\n사용 언어: C++\n\n난이도: ★★☆☆☆',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/19/202003192151_image%20%284%29.png',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/19/202003192151_image%20%284%29_400_880.png',
//     modifiedDate: '2020-03-19T21:51:05.872',
//   },
//   {
//     postId: 64,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200319] 오늘도 시작',
//     content: 'GOGOGO',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/19/202003191104_KakaoTalk_20200319_110307052.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/19/202003191104_KakaoTalk_20200319_110307052_400_880.jpg',
//     modifiedDate: '2020-03-19T11:04:23.972',
//   },
//   {
//     postId: 62,
//     missionId: 52,
//     missionTitle: '1일 1알고리즘',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200318]Move Zeroes',
//     content:
//       '설명: 배열의 0을 끝으로 옮기는 문제\n\n사용 언어: C++\n\n난이도: ★★☆☆☆\n',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/18/202003182147_image%20%283%29.png',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/18/202003182147_image%20%283%29_400_880.png',
//     modifiedDate: '2020-03-18T21:47:35.134',
//   },
//   {
//     postId: 60,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200318] 유니온 도착',
//     content: '인증합니다.',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/18/202003181012_KakaoTalk_20200318_101146332.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/18/202003181012_KakaoTalk_20200318_101146332_400_880.jpg',
//     modifiedDate: '2020-03-18T10:12:34.501',
//   },
//   {
//     postId: 58,
//     missionId: 52,
//     missionTitle: '1일 1알고리즘',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200317] Majority Element',
//     content:
//       '설명: 주어진 배열에서 과반수가 넘는 요소를 찾는 문제\n\n사용 언어: C++\n\n난이도: ★☆☆☆☆',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/17/202003172146_image%20%282%29.png',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/2020/03/17/202003172146_image%20%282%29_400_880.png',
//     modifiedDate: '2020-03-17T21:46:23.197',
//   },
//   {
//     postId: 57,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200317] 도착이요',
//     content: '유니온 도착완료',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/17/202003172143_KakaoTalk_20200317_094245093.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/17/202003172143_KakaoTalk_20200317_094245093_400_880.jpg',
//     modifiedDate: '2020-03-17T21:43:11.919',
//   },
//   {
//     postId: 55,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200316] 인증',
//     content: '도착했습니다!',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/16/202003161051_KakaoTalk_20200316_090212502.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/16/202003161051_KakaoTalk_20200316_090212502_400_880.jpg',
//     modifiedDate: '2020-03-16T10:51:41.58',
//   },
//   {
//     postId: 53,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200313] 유니온 인증',
//     content: 'ㄲㄲ',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/13/202003130844_KakaoTalk_20200313_084319488.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/13/202003130844_KakaoTalk_20200313_084319488_400_880.jpg',
//     modifiedDate: '2020-03-13T08:44:27.877',
//   },
//   {
//     postId: 48,
//     missionId: 50,
//     missionTitle: '1일 1유니온',
//     userName: '수박',
//     userThumbnailUrl:
//       'https://image.daily-mission.com/google/2/202003161641_56552157-%EC%88%98%EB%B0%95-%EC%A1%B0%EA%B0%81%EC%9E%85%EB%8B%88%EB%8B%A4-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98-_40_40.jpg',
//     title: '[200312] 인증',
//     content: '마시쩡',
//     imageUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/12/202003121043_KakaoTalk_20200312_104251267.jpg',
//     thumbnailUrl:
//       'https://image.daily-mission.com/1%EC%9D%BC%201%EC%9C%A0%EB%8B%88%EC%98%A8/2020/03/12/202003121043_KakaoTalk_20200312_104251267_400_880.jpg',
//     modifiedDate: '2020-03-12T10:43:20.823',
//   },
// ];

const CreatePostingBox = ({ handleClickImage, post }) => {
  return (
    <div className="post-thumbnailboxB">
      <div className="post-thumbnailboxB__top">
        <img
          className="post-thumbnailboxB__img"
          src={post.thumbnailUrlMy}
          // onClick={() => {
          //   handleClickImage(post.imageUrl);
          // }}
        />
      </div>
      <div className="post-thumbnailboxB__body">
        <div className="post-thumbnailboxB__title">{post.title}</div>
        <div className="post-thumbnailboxB__content">{post.content}</div>
      </div>
      <div className="post-thumbnailboxB__bottom">
        <div>
          <span className="post-thumbnailboxB__author-wrap">
            From{' '}
            <strong className="post-thumbnailboxB__author-name">
              {post.missionTitle}
            </strong>
          </span>
        </div>
        <div className="post-thumbnailboxB__date">
          {post.modifiedDate.substr(0, 10)}
        </div>
      </div>
    </div>
  );
};

class My extends React.Component {
  state = {
    myPosts: '',
    numOfList: '',
    index: 0,
  };

  CreateMissionList = ({ mission }) => {
    const { onClickMyMissionList } = this.props;
    return (
      <Link
        to={`my/${mission.id}`}
        className={`${mission.banned ? 'list-box--disabled' : ''}`}
      >
        <div
          className="list-box"
          onClick={() => onClickMyMissionList(mission.id)}
        >
          <div className="list-box__img_wrap">
            {mission.submit ? (
              <img
                className="list-box__img"
                src={mission.thumbnailUrl}
                alt={mission.id}
              />
            ) : (
              <img
                className="list-box__img list-box__img--not-submit"
                src={mission.thumbnailUrl}
                alt={mission.id}
              />
            )}
          </div>
          <div
            className={`list-box__title ${
              mission.submit
                ? 'list-box__title--submit'
                : 'list-box__title--not-submit'
            }`}
          >
            {mission.title}
          </div>
          {/* <div className="list-box__progress">현재 10명 제출</div> */}
          {mission.banned ? (
            <div className="list-box__footer list-box__footer--banned">
              강퇴당한 미션입니다
            </div>
          ) : mission.submit ? (
            <div className="list-box__footer list-box__footer--submit">
              제출 완료 😊
            </div>
          ) : (
            <div className="list-box__footer">제출하러 가기 → </div>
          )}
        </div>
      </Link>
    );
  };

  handleRightButtonClick = () => {
    if (
      this.state.index <
      this.props.currentUser.missions.length - this.state.numOfList
    ) {
      this.setState({
        index: this.state.index + 1,
      });
    }
  };

  handleLeftButtonClick = () => {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1,
      });
    }
  };

  handleReactiveList = () => {
    if (this.box) {
      const { clientWidth } = this.box;

      this.setState({
        numOfList: Math.floor((clientWidth - 100) / 300),
      });
    }
  };

  componentDidMount() {
    this.handleReactiveList();

    window.addEventListener('resize', this.handleReactiveList);

    Axios.get('https://api.daily-mission.com/api/post/all/me', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(response => {
      this.setState({
        myPosts: response.data,
      });
    });
  }

  ButtonComponent = ({ icon, func, disabled }) => {
    return (
      <div className="landing__button-wrap">
        <button
          className={`${
            disabled
              ? 'landing__button landing__button--disabled'
              : 'landing__button'
          }`}
          onClick={func}
        >
          <FontAwesomeIcon icon={icon} />
        </button>
      </div>
    );
  };
  render() {
    const { currentUser } = this.props;
    const missions = currentUser.missions.slice(
      this.state.index,
      this.state.numOfList + this.state.index,
    );
    return (
      <>
        <div className="my">
          <div className="my__title">
            <h1 className="my__title-who">
              {currentUser.missions ? (
                <Link to={'/my/edit'}>{currentUser.name}님의 미션😎</Link>
              ) : (
                '미션이 없네요😢'
              )}
            </h1>
          </div>
          <div
            className="my__contents"
            ref={ref => {
              this.box = ref;
            }}
          >
            {currentUser.missions.length > this.state.numOfList && (
              <this.ButtonComponent
                icon={faChevronLeft}
                func={this.handleLeftButtonClick}
                disabled={this.state.index === 0 ? true : false}
              />
            )}
            {missions.map(mission => {
              return <this.CreateMissionList mission={mission} />;
            })}
            {currentUser.missions.length > this.state.numOfList && (
              <this.ButtonComponent
                icon={faChevronRight}
                func={this.handleRightButtonClick}
                disabled={
                  this.state.index ===
                  this.props.currentUser.missions.length - this.state.numOfList
                    ? true
                    : false
                }
              />
            )}
          </div>
        </div>
        <div className="my__my-post">
          <div className="my-post">
            <div className="my-post__title">내가 쓴 글</div>
            <div className="my-post__post-box">
              {this.state.myPosts &&
                this.state.myPosts.map(post => (
                  <CreatePostingBox post={post} />
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default My;
