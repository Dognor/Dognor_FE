import { PageWrapper } from "@/shared/components/layout/PageTopTitle";
import SubMenuBar from "@/shared/components/submenubar/SubMenuBar";
import styled from "@emotion/styled";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommunityTable } from "./CommunityTable";
import { useGetPostList } from "@/domains/post/hooks/useGetPostList";
import { Button } from "@/shared/components/buttons/Button";
import { communityTitles } from "../data/communityData";
import { useGetUserId } from "../../../domains/auth/hooks/useGetUserId";

export function CommunityList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useGetUserId() || {};
  const pathLink = location?.pathname?.split("/");
  let currentPath = pathLink[pathLink.length - 1];
  const { currentCategory, setCurrentCategory } = useOutletContext();
  const [currentTitle, setCurrentTitle] = useState(currentCategory);
  const [totalPage, setTotalPage] = useState();
  const PageTitle = communityTitles[currentTitle]?.title;
  const pageSubTitle = communityTitles[currentTitle]?.subtitle?.split("\n");

  const [getCategoryList, setCategoryList] = useState({
    searchParam: {
      page: 1,
      size: 15,
      sortByHitCnt: false,
      sortByLatest: true,
      myPostsOnly: false,
      categoryCd: 1,
    },
  });

  const { data } = useGetPostList(getCategoryList);
  const { data: postsData, totalPage: allPage } = data?.data || { data: [], totalPage: 0 };

  useEffect(() => {
    setTotalPage(allPage);
  }, [data]);

  const getCurrentPathTitle = () => {
    let selected = communityTitles.findIndex((communityTitle) => communityTitle?.path.includes(currentPath));
    setCurrentTitle(selected);
    setCurrentCategory(communityTitles[selected]?.categoryCd);
  };

  useEffect(() => {
    getCurrentPathTitle();
  }, [getCurrentPathTitle]);

  useEffect(() => {
    setCategoryList((prev) => ({
      ...prev,
      searchParam: {
        ...prev.searchParam,
        categoryCd: communityTitles[currentTitle]?.categoryCd,
      },
    }));
  }, [location, currentTitle]);

  const handleListUpPosts = (e) => {
    const targetBtn = e.target.name;
    const newSearchParam = {
      sortByHitCnt: false,
      sortByLatest: true,
      myPostsOnly: false,
    };
    if (targetBtn === "최신순") newSearchParam.sortByLatest = true;
    if (targetBtn === "조회순") newSearchParam.sortByHitCnt = true;
    if (targetBtn === "내작성글") newSearchParam.myPostsOnly = true;

    setCategoryList((prev) => ({
      ...prev,
      searchParam: { ...prev.searchParam, ...newSearchParam },
    }));
  };

  const getClickedPageNumber = (clicked) => {
    const currentPage = getCategoryList.searchParam.page;

    let newPage;
    if (clicked === "next" && currentPage < totalPage) {
      newPage = currentPage + 1;
    } else if (clicked === "prev" && currentPage > 1) {
      newPage = currentPage - 1;
    } else {
      newPage = Number(clicked);
    }
    if (newPage) {
      setCategoryList((prev) => ({
        ...prev,
        searchParam: { ...prev.searchParam, page: newPage },
      }));
    }
  };

  return (
    <CommunityWrapper>
      <PageWrapper>
        <TitleText currentPath={currentPath}>{PageTitle}</TitleText>
        {pageSubTitle.map((text) => (
          <SubText key={text} currentPath={currentPath}>
            {text}
            <br />
          </SubText>
        ))}
        <MarginTop currentPath={currentPath}>
          <SubMenuBar subMenuList={communityTitles} />
          <BtnsContainer>
            <Button
              variant="secondary"
              size="small"
              onClick={() => (userId ? navigate("/postnew") : navigate("/login"))}
            >
              글쓰기
            </Button>
            <Button variant="normal" size="small" state="outline" name="최신순" onClick={handleListUpPosts}>
              최신순
            </Button>
            <Button variant="normal" size="small" state="outline" name="조회순" onClick={handleListUpPosts}>
              조회순
            </Button>
            <Button variant="normal" size="small" state="outline" name="내작성글" onClick={handleListUpPosts}>
              내 작성글
            </Button>
          </BtnsContainer>
          <CommunityTable
            currentPath={currentPath}
            postsData={postsData}
            getCategoryList={getCategoryList}
            totalPage={totalPage}
            getClickedPageNumber={getClickedPageNumber}
          />
        </MarginTop>
      </PageWrapper>
    </CommunityWrapper>
  );
}

const SubText = styled.span`
  line-height: 30px;
  font-size: 18px;
  display: inline-block;
`;
const TitleText = styled.h2(
  ({ theme, currentPath }) => `
  font-size: 32px;
  text-align: center;
  font-weight: 700;
  line-height: 42px;
  padding-bottom: 16px;
  color: ${currentPath === "needbloods" ? theme.colors.point_orange : theme.colors.neutrals_00}
`
);
const MarginTop = styled.div(
  ({ currentPath }) => `
  margin-top:${currentPath === "all" ? "0px" : "48px"};
  width: 100%;
  text-align: center
`
);
const BtnsContainer = styled.div`
  text-align: left;
  display: flex;
  gap: 4px;
  margin-top: 48px;
  margin-bottom: 8px;
`;
const CommunityWrapper = styled.article`
  padding-top: 100px;
  width: 100%;
`;
