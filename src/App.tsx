import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import DataTable from './components/new_profile/DataTable';
import DefaultLayout from './layout/DefaultLayout';
import Approved_List from './components/new_profile/Approved_List';
import CountryTable from './components/CountryTable';
import StateTable from './components/StateTable';
import DistrictTable from './components/DistrictTable';
import SignIn from './pages/Authentication/SignIn';
import PlaceOfBirthList from './components/PlaceOfBirthList';
import DasaBalanceList from './components/DasaBalanceList';
import LagnamList from './components/LagnamList';
import RasiList from './components/RasiList';
import CasteTable from './components/CasteTable';
import ReligionTable from './components/ReligionTable';
import BirthStarList from './components/BirthStarList';
import ProfileholderTable from './components/ProfileholderTable';
import ParentsoccupationTable from './components/ParentsoccupationTable';
import HighesteducationsTable from './components/HighesteducationsTable';
import UgdegreeTable from './components/UgdegreeTable';
import AnnualincomesTable from './components/AnnualincomesTable';
import ProfileForm from './components/new_profile/AddProfile';
import Feature_profile from './components/new_profile/feature_profile';
import AddProfile from './components/new_profile/AddProfile';
import Datatablel from './components/DataTablel';
import AdminPage from './components/new_profile/DataTable';
import EditProfilePage from './components/EditProfilePage';
import PaidProfile from './components/new_profile/profiles/Paidprofiles';
import Approvedprofile from './components/new_profile/profiles/Approved profile';
import Featuredprofile from './components/new_profile/profiles/Featured profile';
import Deletedprofile from './components/new_profile/profiles/Deleted profile';
import NewProfile from './components/new_profile/profiles/New profile';
import PageList from './components/CsmPage/CsmTableData';
import CsmManagementComponent from './components/CsmPage/CsmManagementComponent';
import CKEditorComponent from './components/CsmPage/AddCsmData';
import CsmEditorComponent from './components/CsmPage/EditCsmData';
import SiteDetailsForm from './components/submenue/Sidebar/AdminSettings/AdminSetting';
import EditAdminUserForm from './components/submenue/AdminUsers/EditAdminUsers';
import AdminUserForm from './components/submenue/AdminUsers/AdminUsers';
import AdminTable from './components/submenue/AdminUsers/AdminTable';
import FamilyTypeTable from './components/FamilytypeTable';
import FamilyStatusTable from './components/FamilystatusTable';
import MatchingProfiles from './components/MatchingProfiles';
import Add from './components/new_profile/Addddd';
import Forming from './components/new_profile/profiles/AddProf';
import Award from './components/Awardgallery';
import SuccessStories from './components/SuccessStory/SuccessStories';
import AddSuccessStory from './components/SuccessStory/AddSuccessStories';
import EditSuccessStory from './components/SuccessStory/EditSucessStory';
import FamilyValueTable from './components/FamilyValueTable';
import MaritalStatus from './components/MaritalStatuses';
import ComplectionTable from './components/ComplexionTable';
import HeightTable from './components/ProfileMasterHeight';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated && pathname !== '/signin') {
    return <Navigate to="/signin" />;
  }

  return (
    <Routes>
      <Route
        path="/signin"
        element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="*"
        element={
          <DefaultLayout>
            <Routes>
              <Route
                index
                element={
                  <>
                    <PageTitle title="" />
                    <AddProfile />
                  </>
                }
              />
              <Route
                path="/ECommerce"
                element={
                  <>
                    <PageTitle title="dash" />
                    <ECommerce />
                  </>
                }
              />

              <Route
                path="/DataTable"
                element={
                  <>
                    <PageTitle title="DataTable" />
                    <DataTable />
                  </>
                }
              />
              <Route
                path="/Approved_List"
                element={
                  <>
                    <PageTitle title="Approved List" />
                    <Approved_List />
                  </>
                }
              />
              <Route
                path="/CountryTable"
                element={
                  <>
                    <PageTitle title="CountryTable" />
                    <CountryTable />
                  </>
                }
              />
              <Route
                path="/StateTable"
                element={
                  <>
                    <PageTitle title="StateTable" />
                    <StateTable />
                  </>
                }
              />
              <Route
                path="/DistrictTable"
                element={
                  <>
                    <PageTitle title="DistrictTable" />
                    <DistrictTable />
                  </>
                }
              />
              <Route
                path="/CasteTable"
                element={
                  <>
                    <PageTitle title="CasteTable" />
                    <CasteTable />
                  </>
                }
              />
              <Route
                path="/ReligionTable"
                element={
                  <>
                    <PageTitle title="ReligionTable" />
                    <ReligionTable />
                  </>
                }
              />
              <Route
                path="/PlaceOfBirthList"
                element={
                  <>
                    <PageTitle title="PlaceOfBirthList" />
                    <PlaceOfBirthList />
                  </>
                }
              />
              <Route
                path="/DasaBalanceList"
                element={
                  <>
                    <PageTitle title="DasaBalanceList" />
                    <DasaBalanceList />
                  </>
                }
              />
              <Route
                path="/LagnamList"
                element={
                  <>
                    <PageTitle title="LagnamList" />
                    <LagnamList />
                  </>
                }
              />
              <Route
                path="/RasiList"
                element={
                  <>
                    <PageTitle title="RasiList" />
                    <RasiList />
                  </>
                }
              />
                <Route
                path="/profile-master/complexion"
                element={
                  <>
                    <PageTitle title="ComplectionTable" />
                    <ComplectionTable/>
                  </>
                }
              />
              <Route
                path="/BirthStarList"
                element={
                  <>
                    <PageTitle title="BirthStarList" />
                    <BirthStarList />
                  </>
                }
              />
              <Route
                path="/ProfileholderTable"
                element={
                  <>
                    <PageTitle title="ProfileholderTable" />
                    <ProfileholderTable />
                  </>
                }
              />
              <Route
                path="/ParentsoccupationTable"
                element={
                  <>
                    <PageTitle title="ParentsoccupationTable" />
                    <ParentsoccupationTable />
                  </>
                }
              />
              <Route
                path="/HighesteducationsTable"
                element={
                  <>
                    <PageTitle title="HighesteducationsTable" />
                    <HighesteducationsTable />
                  </>
                }
              />
              <Route
                path="/UgdegreeTable"
                element={
                  <>
                    <PageTitle title="UgdegreeTable" />
                    <UgdegreeTable />
                  </>
                }
              />
              <Route
                path="/AnnualincomesTable"
                element={
                  <>
                    <PageTitle title="AnnualincomesTable" />
                    <AnnualincomesTable />
                  </>
                }
              />

              <Route
                path="/ProfileForm"
                element={
                  <>
                    <PageTitle title="ProfileForm" />
                    <ProfileForm />
                  </>
                }
              />

              <Route
                path="/feature_profile"
                element={
                  <>
                    <PageTitle title="feature_profile" />
                    <Feature_profile />
                  </>
                }
              />

              <Route
                path="/DataTablel"
                element={
                  <>
                    <PageTitle title="DataTablel" />
                    <Datatablel columns={[]} apiEndpoint={''} />
                  </>
                }
              />
              <Route
                path="/Approvedprofile"
                element={
                  <>
                    <PageTitle title="Approvedprofile" />
                    <Approvedprofile />
                  </>
                }
              />

              <Route
                path="/Featuredprofile"
                element={
                  <>
                    <PageTitle title="Featuredprofile" />
                    <Featuredprofile />
                  </>
                }
              />

              <Route
                path="/Deletedprofile"
                element={
                  <>
                    <PageTitle title="Deletedprofile" />
                    <Deletedprofile />
                  </>
                }
              />

              <Route
                path="/PaidProfile"
                element={
                  <>
                    <PageTitle title="PaidProfile" />
                    <PaidProfile />
                  </>
                }
              />

              <Route
                path="/NewProfile"
                element={
                  <>
                    <PageTitle title="NewProfile" />
                    <NewProfile />
                  </>
                }
              />

              <Route path="/admin" element={<AdminPage />} />
              <Route
                path="/admin/edit/:ContentId"
                element={<EditProfilePage />}
              />
              <Route
                path="/CsmDataTable"
                element={
                  <>
                    <PageTitle title="CsmDataTable" />
                    <PageList />
                  </>
                }
              />

              <Route
                path="/AddCsmData"
                element={
                  <>
                    <PageTitle title="AddCsmData" />
                    <CKEditorComponent />
                  </>
                }
              />
              <Route
                path="/EditCsmData/:id"
                element={
                  <>
                    <PageTitle title="EditCsmData" />
                    <CsmEditorComponent />
                  </>
                }
              />
              <Route
                path="/SiteDetailsForm"
                element={
                  <>
                    <PageTitle title="SiteDetailsForm" />
                    <SiteDetailsForm />
                  </>
                }
              />

              <Route
                path="/AdminUsers"
                element={
                  <>
                    <PageTitle title="AdminUsers" />
                    <AdminUserForm />
                  </>
                }
              />

              <Route
                path="/AdminList"
                element={
                  <>
                    <PageTitle title="AdminList" />
                    <AdminTable />
                  </>
                }
              />
              <Route
                path="/EditAdminUserForm/:id"
                element={
                  <>
                    <PageTitle title="EditAdminUserForm" />
                    <EditAdminUserForm />
                  </>
                }
              />

              <Route
                path="/family-master/family-type"
                element={
                  <>
                    <PageTitle title="FamilyTypeTable" />
                    <FamilyTypeTable />
                  </>
                }
              />
  <Route
                path="/family-master/family-value-options"
                element={
                  <>
                    <PageTitle title="FamilyValueTable" />
                    <FamilyValueTable />
                  </>
                }
              />
              <Route
                path="/family-master/family-status-options"
                element={
                  <>
                    <PageTitle title="FamilyStatusTable" />
                    <FamilyStatusTable />
                  </>
                }
              />
              <Route
                path="/Matching-Profiles"
                element={
                  <>
                    <PageTitle title="MatchingProfiles" />
                    <MatchingProfiles />
                  </>
                }
              />
              <Route
                path="/Add"
                element={
                  <>
                    <PageTitle title="Add" />
                    <Add />
                  </>
                }
              />
              <Route
                path="/Award"
                element={
                  <>
                    <PageTitle title="Award" />
                    <Award />
                  </>
                }
              />
              <Route
                path="/CsmManagementComponent"
                element={
                  <>
                    <PageTitle title="CsmManagementComponent" />
                    <CsmManagementComponent />
                  </>
                }
              />
              <Route
                path="/Adding"
                element={
                  <>
                    <PageTitle title="Adding" />
                    <Forming />
                  </>
                }
              />


              <Route
                path="/SuccessStories"
                element={
                  <>
                    <PageTitle title="SuccessStories" />
                    <SuccessStories />
                  </>
                }
              />

              <Route
                path="/AddSuccessStories"
                element={
                  <>
                    <PageTitle title="AddSuccessStories" />
                    <AddSuccessStory />
                  </>
                }
              />

              <Route
                path="/EditSuccessStory/:id"
                element={
                  <>
                    <PageTitle title="EditSuccessStory" />
                    <EditSuccessStory />
                  </>
                }
              />

              
<Route
                path="/profile-master/marital-status"
                element={
                  <>
                    <PageTitle title="MaritalStatus" />
                    <MaritalStatus />
                  </>
                }
              />





             
<Route
                path="/profile-master/height"
                element={
                  <>
                    <PageTitle title="HeightTable" />
                    <HeightTable />
                  </>
                }
              />




<Route
                path="/profile-master/modes"
                element={
                  <>
                    <PageTitle title="HeightTable" />
                    <HeightTable />
                  </>
                }
              />





            </Routes>
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;
