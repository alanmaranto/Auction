import React from "react";

const Login = React.lazy(() => import("../components/auth/Login"));
const BuyerDashboard = React.lazy(() =>
  import("../components/view/BuyerDashboard/DashboardContainer")
);
const Register = React.lazy(() => import("../components/auth/Register"));
// import Settings = React.lazy(() => import('../components/')) "../components/user/Settings";
const NewProject = React.lazy(() =>
  import("../components/view/NewProject/NewProject")
);
const RunningAuctionView = React.lazy(() =>
  import("../components/view/RunningAuctionView")
);
const FinalizedAuction = React.lazy(() =>
  import("../components/view/FinalizedAuctions")
);
const SupplierDashboard = React.lazy(() =>
  import("../components/view/ProviderDashboard")
);
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
const FavoriteSuppliers = React.lazy(() =>
  import("../components/view/favoriteSuppliers")
);
const AuctonConfigView = React.lazy(() =>
  import("../components/view/AuctionConfig")
);
const AuctonConfigSupplierView = React.lazy(() =>
  import("../components/view/AuctionConfigSupplier")
);
const InvitationsSuppliers = React.lazy(() =>
  import("../components/supplier/invitations/Invitations")
);
const AuctionRFIView = React.lazy(() =>
  import("../components/view/AuctionRFI")
);
const AuctionFAView = React.lazy(() => import("../components/view/AuctionFA"));
const AuctionSubView = React.lazy(() => import("../components/view/AuctionSub"));
const AuctionRFISupplierView = React.lazy(() => import("../components/view/AuctionRFISupplier"))
const AuctionFASupplierView = React.lazy(() => import("../components/view/AuctionFASupplier"));
const AuctionSubSupplierView = React.lazy(() => import("../components/view/AuctionSubSupplier"));
const FinalizedRealTimeView = React.lazy(() => import("../components/view/FinalizedRealTimeAuctions"))
const Admin = React.lazy(() => import("../components/view/Admin"))

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
  RUNNING_AUCTION_VIEW: {
    path: "/runningAuction/:id",
    component: RunningAuctionView,
    term: "runningAuction",
    showSidebar: true,
    showInNavbar: false,
    role: "general",
  },
  AUCTION_CONFIG: {
    path: "/auction-config/:id",
    component: AuctonConfigView,
    term: "runningAuction",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  AUCTION_CONFIG_SUPPLIER: {
    path: "/auction-config-supplier/:id",
    component: AuctonConfigSupplierView,
    term: "runningAuction",
    showSidebar: true,
    showInNavbar: true,
    role: "supplier",
  },
  NOT_APPROVED: {
    path: "/not-approved",
    component: NotApproved,
    term: "notApproved",
    role: "general",
    showInNavbar: false,
  },
  FORGOT_PASSWORD: {
    path: "/auth/forgot-password",
    component: ForgotPassword,
    term: "forgotPassword",
    role: "general",
    showInNavbar: false,
  },
  RESET_PASSWORD: {
    path: "/auth/password/reset/:token",
    component: ResetPassword,
    term: "resetPassword",
    role: "general",
    showInNavbar: false,
  },
  CHOOSE_WINNER: {
    path: "/winner/auction/:id",
    component: ChooseWinnerView,
    term: "chooseWinner",
    showSidebar: true,
    showInNavbar: false,
    role: "buyer",
  },
  NEW_PROJECT: {
    path: "/create/auction",
    component: NewProject,
    term: "Crear Proyecto",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  BUYER_DASHBOARD: {
    path: "/",
    component: BuyerDashboard,
    term: "Dashboard",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  ADMIN: {
    path: "/admin-resources",
    component: Admin,
    term: "Admin",
    showSidebar: true,
    showInNavbar: true,
    role: "admin",
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
    path: "/favorite-suppliers",
    component: FavoriteSuppliers,
    term: "Mis Proveedores",
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
  INVITATIONS_SUPPLIERS: {
    path: "/invitations",
    component: InvitationsSuppliers,
    term: "invitationsSuppliers",
    showSidebar: true,
    showInNavbar: true,
    role: "supplier",
  },
  AUCTION_RFI: {
    path: "/auction/rfi/:userId",
    component: AuctionRFIView,
    term: "auctionRFI",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "buyer",
  },
  AUCTION_RFI_SUPPLIER: {
    path: "/auction/rfi-supplier/:userId",
    component: AuctionRFISupplierView,
    term: "auctionRFISupplier",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "buyer",
  },
  AUCTION_FA: {
    path: "/auction/fa/:userId",
    component: AuctionFAView,
    term: "auctionFA",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "buyer",
  },
  AUCTION_FA_SUPPLIER: {
    path: "/auction/fa-supplier/:userId",
    component: AuctionFASupplierView,
    term: "auctionFASupplier",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "supplier",
  },
  AUCTION_SUB: {
    path: "/auction/sub/:userId",
    component: AuctionSubView,
    term: "auctionSub",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "supplier",
  },
  AUCTION_SUB_SUPPLIER: {
    path: "/auction/sub-supplier/:userId",
    component: AuctionSubSupplierView,
    term: "auctionSubSupplier",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "supplier",
  },
  FINALIZED_AUCTION: {
    path: "/auction/finalized/:userId",
    component: FinalizedAuction,
    term: "Finalizadas",
    subMenu: true,
    showSidebar: true,
    subMenuTitle: "Subastas",
    showInNavbar: true,
    role: "buyer",
  },
  FINALIZED_REAL_TIME_AUCTION: {
    path: "/real-time/finalized/:auctionId",
    component: FinalizedRealTimeView,
    term: "Real Time Finalizadas",
    subMenu: true,
    showSidebar: true,
    showInNavbar: true,
    role: "buyer",
  },
};
