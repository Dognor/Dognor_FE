import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NoticeTable } from "./components/NoticeTable";
import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import { Spinner } from "@/shared/components/Spinner";
import styled from "@emotion/styled";

export default function Community() {
  const location = useLocation();
  const pathSplit = location.pathname.split("/");
  const pathName = pathSplit[pathSplit.length - 1];
  const [currentCategory, setCurrentCategory] = useState(0);

  const BannerImages = [
    { name: "all", img: "banner_all.svg" },
    { name: "free", img: "banner_free.svg" },
    { name: "needbloods", img: "banner_needbloods.svg" },
    { name: "posting", img: "banner_posting.svg" },
    { name: "question", img: "banner_question.svg" },
    { name: "review", img: "banner_review.svg" },
    { name: "thanks", img: "banner_thanks.svg" },
  ];
  const selectedBanner = BannerImages.find((banner) => banner.name === pathName);

  return (
    <>
      <Spinner />
      <CommunityWrapper>
        {selectedBanner && <BannerImg pathName={pathName} link={selectedBanner.img} />}
        <PageWrapper>
          <NoticeTable pathName={pathName} />
          <Outlet context={{ currentCategory, setCurrentCategory }} />
        </PageWrapper>
      </CommunityWrapper>
    </>
  );
}

const CommunityWrapper = styled.div`
  padding-bottom: 100px;
`;
const BannerImg = styled.div(
  ({ pathName, link }) => `
  height: ${pathName !== "community" ? "220px" : "0px"};
  width: 100%;
  margin-top: 130px;
  background-image: url("/src/assets/images/${link}");
  background-position: center
`
);
