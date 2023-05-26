import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { TABLE_KEYS } from "../Common/DataTables/constants";
import DocumentsTable from "../Tables/DocumentsTable";
import PracticesTable from "../Tables/PracticesTable";
import ActivitySection from "./containers/ActivitySection";
import MonitoringSection from "./containers/MonitoringSection";
import SectionWrapper from "./containers/SectionWrapper";
import { actions } from "./store";
import { getHomePageInfo } from "./store/selectors";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector(getHomePageInfo());
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(actions.GET_HOME.REQUEST());
  }, [dispatch]);

  return (
    <>
      <MonitoringSection statuses={statuses} />
      <ActivitySection />
      <SectionWrapper count={5} title="In Pending Practices">
        <PracticesTable
          practices={practices}
          tableKey={`${pathname}/${TABLE_KEYS.PRACTICE}`}
          paginationOption={false}
          filterOption={false}
        />
      </SectionWrapper>
      <SectionWrapper count={5} title="Documents and Notes">
        <DocumentsTable
          documents={documents}
          tableKey={`${pathname}/${TABLE_KEYS.DOCUMENT}`}
          paginationOption={false}
          filterOption={false}
          isDashboard
        />
      </SectionWrapper>
    </>
  );
};

export default Dashboard;
