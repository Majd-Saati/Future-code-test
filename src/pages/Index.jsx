import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdsList from "../components/AdsList";
import Loading from "../components/Loading";
import { fetchAds } from "../store/adsSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(fetchAds(localStorage.getItem("token")));
  }, [dispatch]);

  return (
    <Loading loading={loading} error={error}>
      <AdsList data={ads} loading={loading} error={error} />
    </Loading>
  );
};

export default Index;
