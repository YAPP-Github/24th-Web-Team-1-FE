import { Meta, StoryObj } from "@storybook/react";
import WorkbookCard from "../WorkbookCard";

export default {
  title: "메인 페이지 / 워크북 카드",
  component: WorkbookCard,
} as Meta<typeof WorkbookCard>;

type Story = StoryObj<typeof WorkbookCard>;

export const Default = {
  args: {
    id: 19,
    title: "봄코치의 코칭노트",
    mainImageUrl:
      "https://d3ex4vlh373syu.cloudfront.net/images/2024-07-28/pi2HZxOQ4zInb3oX.webp",
    isPriorityImage: true,
    metaComponent: <p className="body3-medium text-white">교양</p>,
    writers: ["봄코치의 코칭노트"],
    personCourse: "3명 학습중",
    buttonTitle: "구독하기",
    badgeInfo: {},
    cardType: "SUBSCRIBE",
    articleId: "1",
  },
} satisfies Story;

export const Learning = {
  args: {
    id: 19,
    title: "봄코치의 코칭노트",
    mainImageUrl:
      "https://d3ex4vlh373syu.cloudfront.net/images/2024-07-28/pi2HZxOQ4zInb3oX.webp",
    isPriorityImage: true,
    metaComponent: (
      <p className="text-white">
        <span className="body3-bold">Day {10}</span>
        <span className="body3-medium">/{20}</span>
      </p>
    ),
    writers: ["봄코치의 코칭노트"],
    personCourse: "3명 학습중",
    buttonTitle: "Day 10 학습하기",
    badgeInfo: {
      title: "현재 학습중",
      className: "text-text-gray1 bg-[#f5f5f5]",
    },
    cardType: "LEARN",
    articleId: "1",
  },
} satisfies Story;

export const Complete = {
  args: {
    id: 19,
    title: "봄코치의 코칭노트",
    mainImageUrl:
      "https://d3ex4vlh373syu.cloudfront.net/images/2024-07-28/pi2HZxOQ4zInb3oX.webp",
    isPriorityImage: true,
    metaComponent: (
      <p className="body3-bold text-success">
        Day {20}/{20}
      </p>
    ),
    writers: ["봄코치의 코칭노트"],
    personCourse: "총 5명",
    buttonTitle: "공유하기",
    badgeInfo: {
      title: "학습완료",
      className: "bg-success text-white text-[10px]",
    },
    cardType: "SHARE",
    articleId: "1",
  },
} satisfies Story;
