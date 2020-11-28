import React from "react";

const Login = React.lazy(() => import("../components/auth/Login"));
const BuyerDashboard = React.lazy(() =>
  import("../components/view/BuyerDashboard/DashboardContainer")
);
// const NotFound = React.lazy(() => import("../components/core/404/404NotFound"));
const Register = React.lazy(() => import("../components/auth/Register"));
// import Settings = React.lazy(() => import('../components/')) "../components/user/Settings";
const NewAuction = React.lazy(() => import("../components/view/NewAuction"));
const AuctionView = React.lazy(() =>
  import("../components/view/AuctionView/AuctionContainer")
);
const RunningAuctionView = React.lazy(() =>
  import("../components/view/RunningAuctionView")
);
// import AdminRoutes = React.lazy(() => import('../components/')) "./AdminRoutes";
const BuyersRoutes = React.lazy(() => import("./BuyersRoutes"));
const ProvidersRoutes = React.lazy(() => import("./ProvidersRoutes"));
const FinalizedAuction = React.lazy(() =>
  import("../components/view/FinalizedAuctions")
);
const SupplierDashboard = React.lazy(() =>
  import("../components/view/ProviderDashboard")
);
// import WonAuctionsView = React.lazy(() => import('../components/')) '../components/view/WonAuctions/WonAuctionsView'
const ChooseWinnerView = React.lazy(() =>
  import("../components/view/ChooseWinner/ChooseWinnerView")
);
const NotApproved = React.lazy(() => import("../components/auth/NotApprove"));
const ForgotPassword = React.lazy(() =>
  import("../components/auth/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("../components/auth/ResetPassword")
);
const FavoriteSuppliers = React.lazy(() => import ('../components/view/favoriteSuppliers'))

export const generalRoutes = {
  LOGIN: {
    path: "/login",
    component: Login,
    term: "login",
    role: "general",
  },
  REGISTER: {
    path: "/register",
    component: Register,
    term: "register",
    role: "general",
  },
  AUCTION_VIEW: {
    path: "/auction/:id",
    component: AuctionView,
    term: "newAuction",
    showSidebar: true,
    showInNavbar: true,
    role: "general",
  },
  RUNNING_AUCTION_VIEW: {
    path: "/runningAuction/:id",
    component: RunningAuctionView,
    term: "runningAuction",
    showSidebar: true,
    showInNavbar: true,
    role: "general",
  },
  NOT_APPROVED: {
    path: "/not-approved",
    component: NotApproved,
    term: "notApproved",
    role: "general",
  },
  FORGOT_PASSWORD: {
    path: "/auth/forgot-password",
    component: ForgotPassword,
    term: "forgotPassword",
    role: "general",
  },
  RESET_PASSWORD: {
    path: "/auth/password/reset/:token",
    component: ResetPassword,
    term: "resetPassword",
    role: "general",
  },
   CHOOSE_WINNER: {
    path: "/winner/auction/:id",
    component: ChooseWinnerView,
    term: "chooseWinner",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  FINALIZED_AUCTION: {
    path: "/finalized",
    component: FinalizedAuction,
    term: "finalizedAuction",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  NEW_AUCTION: {
    path: "/create/auction",
    component: NewAuction,
    term: "newAuction",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  BUYER_DASHBOARD: {
    path: "/",
    component: BuyerDashboard,
    term: "buyerDashboard",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  SUPPLIER_DASHBOARD: {
    path: "/provider-dashboard",
    component: SupplierDashboard,
    term: "supplierDashboard",
    showSidebar: true,
    showInNavbar: true,
    role: "supplier",
  },
  FAVORITE_SUPPLIERS: {
    path: '/favorite-suppliers',
    component: FavoriteSuppliers,
    term: 'favoriteSuppliers',
    showSidebar: true,
    showInNavbar: true,
    role: 'buyer'
  }
};
