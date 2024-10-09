import { Meta, StoryObj } from "@storybook/react";
import ArticleCard from ".";

export default {
  title: "메인 페이지 / 아티클 카드",
  component: ArticleCard,
} as Meta<typeof ArticleCard>;

type Story = StoryObj<typeof ArticleCard>;

export const Default = {
  args: {
    id: 25,
    isPriorityImage: true,
    writerInfo: {
      name: "디깅레터",
      url: "https://maily.so/diggin",
      imageUrl:
        "https://d3ex4vlh373syu.cloudfront.net/images/2024-08-05/fDTTYbvXjL2Kq3oH.png",
    },
    thumbnail:
      "https://d3ex4vlh373syu.cloudfront.net/images/2024-08-17/1718715085413107.webp",
    title: "\uD83D\uDCF1과연 학습 스토커다운 듀오링고 CRM 마케팅",
    content:
      '<article style="max-width: 480px; font-size: 15px; line-height: 170%; font-weight: 400;">\n <p>오랜만입니다. 여름의 문턱에서 안녕하신가요? \uD83C\uDF33 6월에는 마케팅 중에서도 유저와 지속적으로 관계를 형성해 이탈을 줄이는 CRM 마케팅을 눈여겨보게 되었는데요. 특히 학습 스토커라고 불릴 정도로 독특한 방식의 CRM 마케팅을 펼치고 있는 브랜드가 있더라고요! 과연 어떤 브랜드일지 함께 살펴보도록 해요! \uD83D\uDC40</p>\n <h3 style="font-size: 20px; line-height: 140%; font-weight: 600">\uD83D\uDCCD게이미피케이션, 학습에 적용하는 게임 도파민.</h3>\n <p>2024년 트렌드 키워드 중 ‘도파밍\'이라는 단어가 있는데요. 도파밍이란 도파민(Dopamine)과 파밍(Farming)을 더한 결합어로 신나는 경험을 통해 도파민이 분비되는 행위를 의미합니다.&nbsp;</p>\n <p>여기&nbsp;게임의&nbsp;메커니즘을&nbsp;학습에 적용해 게이미피케이션(Gamification)을 실현하고,&nbsp;<strong>학습의 도파밍</strong>을 만들어낸 브랜드가 있는데요. 바로 언어 학습 플랫폼 ‘<a href="https://www.duolingo.com/learn" style="overflow: hidden; word-break: break-all;">듀오링고(Duolingo)</a>’입니다.</p>\n <p>듀오링고 CEO인 루이스 본 안(Luis von An)은 대부분의 사람들이 스마트폰으로 세상에 접근한다는 것을 보고, 스마트폰을 활용해 배움의 길을 만들어야겠다고 생각했습니다. 그는 틱톡과 인스타그램, 게임과 같은 도파민 유발 요소를 참고해, 재미를 갖추고 쉬운 접근 방식을 가진 모바일 언어 학습 플랫폼 듀오링고를 만들었죠.</p>\n <p><img src="https://cdn.maily.so/b26e60vffyno3k20xfy8r7hjm6kp" alt="© 출처 : Duolingo - 게임이 생각나는 여러 장치들&nbsp;" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></p>\n <p>© 출처 : Duolingo - 게임이 생각나는 여러 장치들&nbsp;</p>\n <p>실제로 어플을 살펴보면 하루라도 건너뛰면 다시 1로 돌아가는 day streak 불꽃, 경험치(XP), 게임 속 목숨과 비슷한 하트 등 게임 장치들이 있습니다. 이러한 게임 요소들은 유저들의 학습 의욕을 고취시키는 데 큰 몫을 합니다.</p>\n <h3 style="font-size: 20px; line-height: 140%; font-weight: 600">\uD83D\uDCCD마침내 학습하도록, 듀오링고의 지독한 CRM 마케팅</h3>\n <p><a href="https://youtu.be/8wc83qX6oNM?si=CL-LKSMHk8ZZ1Qz6" style="overflow: hidden; word-break: break-all;"><img src="https://cdn.maily.so/bnmegjwrivxz3wzwxjktuuks7sxj" alt="© 출처 : Duolingo push" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></a></p>\n <p>© 출처 : Duolingo push</p>\n <p>하지만 작심삼일이라는 말이 괜히 나온 게 아닌 만큼, 언어를 꾸준히 학습하기란 어려운 일입니다. 지속적인&nbsp; 끈기가 필요하죠. 그렇다면 듀오링고는 어떤 방식으로 사용자들의 학습을 돕고 있을까요?</p>\n <p>듀오링고는 ‘릴리\'와 \'듀오\'라는 캐릭터를 활용해 앱 푸시 알림을 보내는 CRM 마케팅을 펼치고 있습니다. 여기서 **CRM이란 고객 관계 관리(Customer Relationship Management)**를 뜻하며, 확보된 기존 고객의 데이터를 통해 상호작용하고 이들의 이탈을 막는 일을 말합니다. 듀오링고 CRM 마케팅에서 주목해야 할 점은 바로 릴리의 말투인데요. 릴리의 말투는 다른 앱 푸시 알림과는 달리 조금 특이합니다. 친절함과는 다소 거리가 있는 시니컬한 말투를 가지고 있죠.&nbsp;</p>\n <p><img src="https://cdn.maily.so/m772k5kapjsa659xoux05a0gzfzk" alt="© 출처 : Duolingo Instagram - 듀오링고 캐릭터 릴리" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></p>\n <p>© 출처 : Duolingo Instagram - 듀오링고 캐릭터 릴리</p>\n <p><em>‘마지막으로 레슨을 한 지 3일이 지났어요. 오늘 영어를 연습하세요. 아님 말고요. 제가 상관할 바 아니죠.’</em></p>\n <p><em>‘듀오가 자꾸 무시당하는 것 같다고 하도 그래서 이번에는 내가 대신 왔어요. 6일 연속 학습을 이어가시려면 가시고. 아님 말고요.’</em></p>\n <p>위는 실제 릴리가 보낸 앱 푸시 알림 중 일부입니다. 원래 최고의 동기부여는 ‘하기 싫으면 하지 마. 어차피 결과도 너의 몫이니까.’와 같이 현실적이며 무서운 말이라고 하잖아요. 이처럼 듀오링고는 남다른 페르소나를 설정해 학습자의 동기부여를 돕고 있습니다. 앱 푸시 외에도 학습이 중단될 경우 캐릭터인 듀오가 폭삭 늙거나, 유저들의 학습을 돕기 위해 흑화한 \'악의 듀오\'를 SNS에 업로드해 유명하기도 하죠.</p>\n <p><img src="https://cdn.maily.so/4kvmg433nzfa6s0j313fdo2j6epg" alt="© 출처 : Duolingo - 학습을 유도하는 짤 &amp; 학습이 중단되면 위젯에 뜨는 늙은 듀오" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></p>\n <p>© 출처 : Duolingo - 학습을 유도하는 짤 &amp; 학습이 중단되면 위젯에 뜨는 늙은 듀오</p>\n <h3 style="font-size: 20px; line-height: 140%; font-weight: 600">\uD83D\uDCCD파격적인 마케팅 전략, 그 결과는?</h3>\n <p>듀오링고의 파격적인 CRM 마케팅에 대해 ‘과연 성과까지 이어질까?’하는 의문이 드실 수도 있을 것 같은데요. 그렇다면 듀오링고의 <strong>월간 활성 사용자 수(MAU)나 매출</strong>은 어떻게 변화하고 있을까요?&nbsp;</p>\n <p><img src="https://cdn.maily.so/44lmarva5jpuqznmwzc3mrhzq2d5" alt="© 출처 : Statista (Duolingo MAUs)" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></p>\n <p>© 출처 : Statista (Duolingo MAUs)</p>\n <p><img src="https://cdn.maily.so/wtxumlittm0bc824hd5j2qjfj6jv" alt="© 출처 : Duolingo report (Duolingo MAUs&amp;DAUs)" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></p>\n <p>© 출처 : Duolingo report (Duolingo MAUs&amp;DAUs)</p>\n <p>2024년 1분기(3월) 리포트 기준, 듀오링고의 월간 활성 사용자 수(MAU)는 9,760만 명을 넘었고 이는 전년 동기 대비 무려 35% 증가한 수치입니다. 일간 활성 사용자 수(DAU) 역시 동일 시점 기준 3,140만 명으로 전년 동기 대비 54% 증가, 유료 가입자는 총 740만 명으로 전년 동기 대비 54%가 증가했습니다.&nbsp;</p>\n <p><img src="https://cdn.maily.so/6cacztaxqcx6fhunwh1lwq69anxi" alt="© 출처 : Duolingo report" style="max-height: 280px; object-fit: contain; max-width: 480px; margin-left: auto; margin-right: auto; width: 100%;"></p>\n <p>© 출처 : Duolingo report</p>\n <p>더 나아가 2024년 1분기 매출도 살펴보면, 총 매출액(GAAP) 1억 6,760만 달러(약 2,301억)로 전년 동기 대비 45% 증가한 모습을 보였습니다.</p>\n <hr>\n <p>\uD83E\uDEBA 끝으로 디깅레터를 구독하신 독자분들에게 반가운 소식을 전하려고 해요. 7월부터 디깅레터에 발행된 내용 일부를 <a href="https://hopeful-music-744368.framer.app/" style="overflow: hidden; word-break: break-all;">학습지 서비스’FEW’</a>에서도 만나보실 수 있습니다. 경제부터 브랜딩까지 다양한 토픽을 다룰 예정이니 학습지 서비스 ‘FEW’도 많은 관심 부탁드립니다-! \uD83D\uDCF0</p>\n <p><a href="https://www.instagram.com/few.letter/" style="overflow: hidden; word-break: break-all;">FEW 서비스 구경하기</a></p>\n <p><a href="https://maily.so/diggin" style="overflow: hidden; word-break: break-all;">디깅레터 구독하기</a></p>\n</article>',
    category: "마케팅",
    viewCount: 149,
    withWorkbookList: [
      {
        id: 2,
        title: "디테일 차이가 이끄는 마케팅, 디깅레터 ",
      },
    ],
  },
} satisfies Story;
