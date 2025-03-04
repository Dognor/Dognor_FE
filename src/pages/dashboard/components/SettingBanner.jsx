import { useEffect, useState } from "react";
import { BannerSettingCard } from "./BannerSettingCard";
import Banner1 from "/src/assets/icons/number/banner_num_1.svg?react";
import Banner2 from "/src/assets/icons/number/banner_num_2.svg?react";
import Banner3 from "/src/assets/icons/number/banner_num_3.svg?react";
import Banner4 from "/src/assets/icons/number/banner_num_4.svg?react";
import { useBannerMutations } from "../hooks/useBanner";
const bannersNumImg = [Banner1, Banner2, Banner3, Banner4];

export function SettingBanner() {
  const [bannerData, setBannerData] = useState({
    webImgFile: "",
    mobileImgFile: "",
    link: "",
    strDt: "",
    endDt: "",
    memo: "",
  });
  const { saveBannerMutation, deleteBannerMutation, getBannerQuery } = useBannerMutations();
  const { data: bannerList, isLoading, isError } = getBannerQuery;
  const [prevBanners, setPrevBanners] = useState([]);

  useEffect(() => {
    if (bannerList) {
      setPrevBanners(bannerList?.data);
    }
    console.log("리스트", bannerList);
  }, [prevBanners]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in bannerData) {
      if (bannerData[key]) {
        formData.append(key, bannerData[key]);
      }
    }
    //console.log([...formData.entries()]);
    saveBannerMutation.mutate(formData);
  };

  return (
    <form id="bannerForm" onSubmit={handleSubmit} style={{ width: "100%" }}>
      {bannersNumImg.map((banner, idx) => (
        <BannerSettingCard
          key={idx}
          img={banner}
          setBannerData={setBannerData}
          deleteBannerMutation={deleteBannerMutation}
          prevBanners={prevBanners}
        ></BannerSettingCard>
      ))}
    </form>
  );
}
