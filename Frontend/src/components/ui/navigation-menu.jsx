// Frontend/src/components/ui/navigation-menu.jsx

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown, Menu, X, Mountain } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "sticky top-0 z-[100] flex w-full items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm",
        className
      )}
      {...props}
    >
      {/* --- LOGO SECTION START --- */}
      <a href="/" className="flex items-center gap-3 group no-underline">
        <div className="bg-green-900 p-2 rounded-lg group-hover:bg-green-800 transition-colors shadow-lg shadow-green-900/20">
          <Mountain className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-xl leading-none tracking-tighter text-green-900">
            THE SEVEN
          </span>
          <span className="font-bold text-xs tracking-[0.3em] text-stone-500 leading-tight">
            GIANTS
          </span>
        </div>
      </a>
      {/* --- LOGO SECTION END --- */}

      {children}

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenuViewport />
      </div>
    </NavigationMenuPrimitive.Root>
  )
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "hidden md:flex list-none items-center justify-center space-x-4",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground"
);

const NavigationMenuTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="ml-1 h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion^=from-]:zoom-in-95 data-[motion^=to-]:zoom-out-95 md:absolute md:w-auto",
        className
      )}
      {...props}
    />
  )
);
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div className={cn("absolute left-0 top-full flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        ref={ref}
        className={cn(
          "relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
);
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
);
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

// ===========================
// Responsive MainNavigation
// ===========================
export default function MainNavigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  // Check if user is logged in on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to home
  };

  return (
    <NavigationMenu>
      {/* Desktop Menu */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-stone-700 hover:text-green-800 transition-colors font-semibold">
            Mountains
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white rounded-xl shadow-2xl border border-stone-100">
              <li className="col-span-2 mb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 px-2">
                  Select a Peak
                </p>
              </li>
              {[
                { id: 1, name: "Mount Everest", desc: "The Roof of the World" },
                { id: 2, name: "K2", desc: "The Savage Mountain" },
                {
                  id: 3,
                  name: "Kangchenjunga",
                  desc: "The Five Treasures of Snow",
                },
                { id: 4, name: "Lhotse", desc: "The South Peak" },
                { id: 5, name: "Makalu", desc: "The Great Black" },
                { id: 6, name: "Cho Oyu", desc: "The Turquoise Goddess" },
                { id: 7, name: "Dhaulagiri", desc: "The White Mountain" },
              ].map((mtn) => (
                <NavigationMenuLink
                  key={mtn.id}
                  href={`/mountains/${mtn.id}`}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-stone-50 hover:text-green-900"
                >
                  <div className="text-sm font-bold leading-none">
                    {mtn.name}
                  </div>
                  <p className="line-clamp-2 text-xs leading-snug text-stone-500">
                    {mtn.desc}
                  </p>
                </NavigationMenuLink>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/recommended"
            className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Recommended
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/contact"
            className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href="/about"
            className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            About
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* --- AUTH SECTION START --- */}
        <div className="ml-4 flex items-center gap-2 border-l pl-4 border-stone-200">
          {user ? (
            <>
              {/* 🌟 NEW: SHOW ADMIN LINK ONLY FOR YOU */}
              {user.email === "adammostofi@gmail.com" && (
                <NavigationMenuLink
                  href="/admin"
                  className="text-xs font-black text-green-700 uppercase tracking-widest px-3 py-1 bg-green-50 rounded-lg border border-green-100 mr-2 hover:bg-green-100 transition-colors"
                >
                  Admin Panel
                </NavigationMenuLink>
              )}

              <span className="text-sm font-medium text-stone-500 italic mr-2">
                Hi, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-800 transition-colors shadow-lg shadow-stone-900/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavigationMenuLink
                href="/login"
                className="text-sm font-bold text-stone-600 hover:text-green-900 px-3"
              >
                Login
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/signup"
                className="bg-green-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-900/20"
              >
                Sign Up
              </NavigationMenuLink>
            </>
          )}
        </div>
        {/* --- AUTH SECTION END --- */}
      </NavigationMenuList>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-accent"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Slide-Over Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-background flex flex-col p-4 space-y-2 shadow-md md:hidden">
          <NavigationMenuLink
            href="/"
            className="px-3 py-2 rounded-md hover:bg-accent"
          >
            Home
          </NavigationMenuLink>
          <NavigationMenuLink
            href="/recommended"
            className="px-3 py-2 rounded-md hover:bg-accent"
          >
            Recommended
          </NavigationMenuLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="text-left px-3 py-2 rounded-md text-red-600 font-bold hover:bg-red-50"
            >
              Logout ({user.username})
            </button>
          ) : (
            <>
              <NavigationMenuLink
                href="/login"
                className="px-3 py-2 rounded-md hover:bg-accent"
              >
                Login
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/signup"
                className="px-3 py-2 rounded-md bg-green-900 text-white mt-2 text-center"
              >
                Sign Up
              </NavigationMenuLink>
            </>
          )}
        </div>
      )}
    </NavigationMenu>
  );
}
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
};
