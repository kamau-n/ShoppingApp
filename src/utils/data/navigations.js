import { PersonAdd } from "@material-ui/icons";
import { Grid, LayoutDashboard, Package, Settings, ShoppingBag, ShoppingCart, SubscriptIcon } from "lucide-react";

const navigation = [{
        name: "Overview",
        tab: "overview",
        icon: LayoutDashboard,
        role: ["admin", "business", "customer"],
    },
    {
        names: "Users",
        tab: "users",
        icon: PersonAdd,
        role: ["admin"],
    },

    {
        name: "Products",
        tab: "products",
        icon: ShoppingBag,
        role: ["admin", "business"],
    },
    {
        name: "Orders",
        tab: "orders",
        icon: Package,
        role: ["admin", "customer"],
    },
    {
        name: "Subscriptions",
        tab: "subscriptions",
        icon: SubscriptIcon,
        role: ["admin"],
    },
    {
        name: "Categories",
        tab: "categories",
        icon: Grid,
        role: ["admin", "business"],
    },
    {
        name: "Business Profiles",
        tab: "businessprofiles",
        icon: ShoppingBag,
        role: ["admin"],
    },
    {
        name: "My Business Profile",
        tab: "mybusinessprofile",
        icon: ShoppingCart,
        role: ["business", "admin"],
    },

    {
        name: "Settings",
        tab: "settings",
        icon: Settings,
        role: ["admin", "business", "customer"],
    },
];

export default navigation;