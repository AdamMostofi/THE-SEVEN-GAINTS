import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex w-full items-center justify-between bg-background px-4 py-2",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "hidden md:flex list-none items-center justify-center space-x-4",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground"
)

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
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
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute top-full left-0 mt-1 w-56 rounded-md border bg-popover shadow-md p-2 md:w-auto",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
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
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef(({ className, ...props }, ref) => (
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
))
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName

// ===========================
// Responsive MainNavigation
// ===========================
export default function MainNavigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <NavigationMenu>
      {/* Desktop Menu */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Mountains</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/mountain1" className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Everest</NavigationMenuLink>
            <NavigationMenuLink href="/mountain2" className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">K2</NavigationMenuLink>
            <NavigationMenuLink href="/mountain3" className="block px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Kangchenjunga</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/recommended" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Recommended</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/contact" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Contact</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">About</NavigationMenuLink>
        </NavigationMenuItem>
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
          <NavigationMenuLink href="/" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Home</NavigationMenuLink>

          {/* Mountains Dropdown */}
          <div className="flex flex-col">
            <span className="px-3 py-2 font-medium flex items-center justify-between rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => setMobileOpen(prev => !prev)}>Mountains <ChevronDown className="h-3 w-3 ml-1" /></span>
            <div className="ml-4 flex flex-col space-y-1 mt-1">
              <NavigationMenuLink href="/mountain1" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Mountain 1</NavigationMenuLink>
              <NavigationMenuLink href="/mountain2" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Mountain 2</NavigationMenuLink>
              <NavigationMenuLink href="/mountain3" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Mountain 3</NavigationMenuLink>
            </div>
          </div>

          <NavigationMenuLink href="/recommended" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Recommended</NavigationMenuLink>
          <NavigationMenuLink href="/contact" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">Contact</NavigationMenuLink>
          <NavigationMenuLink href="/about" className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground">About</NavigationMenuLink>
        </div>
      )}
    </NavigationMenu>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator
}
