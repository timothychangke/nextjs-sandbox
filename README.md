## Notes

Next.js simplifies the process of building web applications for production
1. Routing
2. API routes
3. Rendering
4. Data fetching
5. Styling 
6. Optimisation
7. Dev and Prod build system

Nextjs File structure
1. package.json – contains the dependencies of the application. Dependencies and DevDependencies are dependent on what you chose when starting up the project as well as scripts
2. configuration files – next.config.js for next, tsconfig.json for typescript, eslintrc.json for eslint, tailwind.config.ts and postcss.config.js for tailwind css
3. .next folder – serves applications
4. node_modules folder – dependencies that are automatically downloaded upon npm i or npm run dev
5. public folder – contains static images and svgs
6. the source folder which contains the app router
    – global.css which contains the global styles for the app
    - layout.tsx is the layout shared between different pages
    - page.tsx which displays the ui

Nextjs flow of control
when you run the command npm run dev, the control is passed to layout.tsx and the RootLayout component is rendered
from the children prop, it then renders the various page components

React Server Components(RSC)
there now exist two different type of componenets
1. Server Components
- all components are server components by default
- they can run tasks like reading files or fetching data from db
- cannot use hooks or handle user interactions
2. Client Components
- need to add a "use client" at the top of the component file
- can use hooks and manage interactions but cannot perform tasks like reading files

Routing
nextjs uses a file-system based routing mechanism 
url paths that the users can access in the browser are defined by files and folders in codebase

Routing Conventions
all routes must be placed inside the app folder
every file that corresponds to a route must be named page.js or page.tsx
every folder corresponds to a path segment in the browser URL
a not matching route will return an error
if there is no page.tsx, the route will be invalid
if page.tsx is not exported as the default function, the route will error. 
but this also means that project files can be safely colocated in the same files and folders as long as they do not meet the page.tsx requirements. However, it is better convention to keep project files outside of the app folder.

Dynamic routes
in nextjs, you enclose a filename in [brackets] to create a dynamic route. These also allows for the creation of dynamic nested routes.
the catch all segments feature will catch all urls that contain the initial url parameter and maps them to one single page.tsx. To do this, simply create a folder named "[...slug]" inside the original folder.
in the event you want to catch all segments even without a slug, you wrap the slug folder name with another pair of square brackets: "[[...slug]]"

Customise Not Found page
by default, when the user enters a route that is not valid, nextjs will automatically serve its default 404 not found page. To customise your own, simply create a not-found.tsx file in your app folder
this page can also be rendered programmatically, when an url id exceeds a certain valid boundary for example. You'll have to import the notFound function from next/navigation and then run the function conditionally
a customised not-found page can be done up in the subfolder as well. this will be the page that is routed to when notFound() is called

Private folder
a private folder indicates a private implementation detail that should not be considered in routing
the folder and all its subfolders are excluded from routing
to specify a private folder, simply add a underscore in the folder name. Even if it contains a page.tsx, it would not be accessible
private folders exist for several reasons:
 - separating UI logic from routing logic
 - consistently organising internal files across a project
 - for sorting and grouping files
 - to avoid potential naming conflicts with future Nextjs file conventions
(if you want to your file name with a underscore by still have it be a url route, youll have to prefix the folder name with '%5F' which is the url-encoded version of an underscore)

Route Groups
they allow developers to logically group routes and project files without affecting the URL path structure
say you want to group your different authentication methods into a folder for ease of development, but you don't want it to affect you url path, route groups are the solution.
to create a route group, wrap the folder name in (paranthesis)
route groups serve as folders to organise code and can even be nested if needed

Layout
a page is a UI to one route while a layout is a UI shared between multiple pages in the app
you can define a layout by default exporting a react component from a layout.js or layout.tsx file
that component should accept a children prop that will be populated with a child page during rendering
in every app folder, there exists a root layout. It is mandatory and will be generated even when deleted
a nested layout will only be served together with the page.tsx at the particular layer or below

route groups can also be applied to layout so as to organise the project without affecting the URL
a route group can apply a layout to certain pages while leaving others unchanged

Routing Metadata
search engine optimisation(SEO) is cruicial for increasing visibility and attracting users
nextjs introduced the metadata api which allows one to define the metadata for each page
this metadata ensures accurate and relevant information is displayed when your pages are shared or indexed
metadata can be configured by either exporting a static metadata object or exporting a dynamic generateMetadata function

Metadata Rules
both the layout.tsx and page.tsx can export metadata. If defined in layout, itll apply to all pages
metadata is read in order from the root level down the to final page level
when there is metadata in multiple places, they are combined
page metadata will replace layout metadata if they have the same properties as the one at the deepest layer takes precedence

static metadata contains the same metadata for all pages while dynamic metadata has the metadata adjusted to the values of the page
the title field in metadata defines the document title. It is either a string or an object
there are three fields in a title object: absolute, default and template. default specifies the title in the current layout while template allows for dynamic titles in children pages (%s replaces the title of the child page)
the absolute key replaces and ignores whatever the metadata was in the layout file

Navigation
we previously learnt how to navigate via different URLs in the browser, however that is not how users would navigate to different routes
users would rely on links for navigation, either by clicking on them or programmatically after completing an action
the primary way to navigate between routes in nextjs is via the <Link> component where the href property is the route
the replace prop in Link would replace the entire state histroy instead of just adding the url into the stack

the usePathname import from next/navigation returns the current pathname of the browser. However this is only allowed in client components

Programmatic Navigation
this feature is needed when a user is to be navigated to another page after completing a specific action
import the useRouter function from next/navigation, instantiate it and then push the next router via router.push()
instead of pushing, you can use router.replace to replace the entire state histroy
router.back() can navigate one back into the history stack and router.forward() to navigate to the next page

Templates
in a layout, when navigating to different pages, its state is preserved and will exist on all pages that utilise that layout
they are similar to layouts in that they wrap each child layout or page
but, with templates, when a user nagivates between routes that share a template, a new instance of the componenent is mounted, DOM elements are recreated, state is not preserved and effects are re-synchronised
a template can be defined by exporting a default React component from a template.js or template.tsx file
similar to layouts, templates also should accept a child prop which will render the nested segments in the route
in the same folder level, both a layout and a template can coexist. The layout is rendered first followed by the template inside of it
layout, however, are more common

Loading
loading.tsx allows us to create a loading state that is displayed to users while a specific route segment's content is loading
the loading state appears immediately upon navigation, giving users the assureance that the application is responsive and actively loading content
just remember to place the loading.tsx in the appropreiate folder
with loading.tsx, you can display the laoding state as soon as a user navigates to a new route. This immediate feedback reassures the users taht their actions have been acknowledged, reducing perceived loading times and makes the application feel more responsive
the creation of shared layouts remain responsive while the new route segments are loading. This means that the user can continue interacting with other parts of the application while the main content is still being fetched

Error Handling
gracefull error handling would return an error only in the erroring component while leaving the other components still working, this is where error.tsx comes in
error.tsx automatically wraps a route segment and its nested children the a React Error boundary
an error UI tailored to specific segments using the file system hierarchy will isolate errors only to affected segments while keeping the rest of the application functional

additional functionality can be added to attempt a recover from an error without a full page reload
one such functionality is the reset() function that can reset the page upon erroring

in nested routes, errors bubble up to the closest parent error boundary. this implies that an error.tsx file will cater to errors for all its nested child segments
by positioning error.tsx files at different levels in the nested folders of a route, you can achieve a more granular level of error handling
the placement of error.tsx controlls the scope of error handling, allowing the developer to specify which parts of the ui is affected when error occur

Error Handling in layouts
in the component hierarchy, layout sits above the error boundary meaning that error boundaries do not catch errors thrown here
in this case, the error.tsx has to be placed above the layout.tsx in its parent folder

Parallel Routes
they are advanced routing mechanisms that allow for simultaneous rendering of multiple pages within the same layout
parallel routes are defined using a feature known as slots. They help structure a content in a modular fashion. To define a slot, use the @folder naming convention
each slot is then passed as a prop to its corresponding layout.tsx file which then allows you to structure the dashboard page
with parallel routes, you can split a single layout into various slots, making the code more manageable
they also provide the additional benefit of:
 - independent route handling
 each slot of your layout can have their own loading and error states
 this granular control is beneficial in scenarios where different sections of the page load at varying speeds or encounter unique errors. They will not affect the other components on the page
 - sub-navigation
 each slot can function as their own mini application complete with its own navigation and state manangement
 this is very useful especially in complex applications where different sections serve distinct purposes

Unmatched Routes
when interacting with different slots and in the event you navigate to a different route within one slot, the other slots would then have unmatched routes
in the case of navigation within the UI, nextjs retains the previously active state of a slot regardless of changes in the URL
in the case of a page reload, nextjs searches for a default.tsx file within each unmatched slot. The file will provide the default content that nextjs will render in the user interface
a missing default.tsx file in any of the unmatched slots for the current route will return a 404 error 
the default.tsx file serves as a fallback to render content when the framework cannot retrieve a slot's active state from the current URL
the dev has complete freedom to define the UI for unmatched routes, either mirroring the content in page.tsx or crafting an entirely custom view
routes can also be rendered conditionally via slots

Intercepting Routes
intercepting routes allows you to intercept or stop the default routing behaviour to present an alternate view or component when navigating through the UI, while still preserving the intended route for page reloads
this is useful if you want to show a route while keeping the context of the current page
in an intercepting route, it would render the content of the intercepting page when navigated via link from the previous folder, but render the original content on page reload
the syntax to denote an intercepting route is (.)folder_name
f1 folder contains f2 and (.)f2. When going from f1 to f2, (.)f2 is rendered and f2 when reloaded
this can also be done for segments one level above. The syntax is (..)folder_name
f1 folder contains f3 and f4. The f4 folder contains (..f3). When routing from f4 to f3, (..)f3 is rendered and f3 when reloaded
(..)(..) is used to match segments two levels above and (...) to match segments from the root app directory
the url remains the same in all cases
openning a modal is a good use case for intercepting routes

Route Handlers
we can also create custom request handlers for our routes using route handlers
route handlers allow you to create RESTful endpoints, giving you full control over the response
there is no overhead of creating and configuring a seperate server
route handlers are also great for making external API requests
they run server-side, ensuring that sensitive information like private keys remain secure and never get shipped to the browser
route handlers are the equivalent of API routes in page routers

route handlers must also be placed in the app folder
the routes must be placed in a folder called route.ts
specifying the function names as API methods like GET or POST is another convention that we must follow
routes can also be organised into folders and subfolders, the url will be chained accordingly
to prevent conflicts where both page and route files are in the same folder (api will return first when url is accessed by default), you can put the route file into an api folder

Dynamic route handlers
it is typical for put, patch and delete methods to require an id in order to specify which item it refers to
to create a dynamic api route, create a file named [id] then create a route.ts file inside this folder
the nextRequest object type helps in managing query parameters in nextjs. They are very helpful in search, sort and pagination
next/navigation also has a redirection function that allows redirection in the event the id in the url is invalid

Headers in Route Handlers
HTTP headers represent the metadata associated with an API request and responsive
request headers are sent by the client, such as the web browser, to the server. They contain essential information about the request, which helps the server understand and process correctly
types of request headers
 - 'User-Agent' identifies the browser and operating system to the server
 - 'Accept' indicates the content types like text, video or image formats that the client can process
 - 'Authorisation' header is used by the client to authenticate itself to the server

response headers are sent back from server to the client. They provide information about the server and the data being sent in the response
'Content-type' header indicates the media type of the response. It tells the client what the data type of the returned content is: text/html for HTML documents, application/json for JSON data, etc

headers can be obtain via two different ways
one way is via the request.headers from next/server's NextRequest type
another way is via next/headers headers object
the browser also interprets data differently based on the different headers. For example, content type of plain/text vs text/html

Cookies in Route Handlers
they are small pieces of data that a server sends to a user's web browser
the browser may store the cookie and send it back to the same server with later request
cookies are used for these purposes:
 - Session management like logins and shopping carts
 - Personalisation like user preferences and themes
 - Tracking like recording and analysing user behaviour

you can add a set-cookie attribute in the header response then retrieve it via the request.cookies.get() methods
alternatively, you can retrieve them via the cookies function in the next/headers package. You can set it via cookies.set(key, value) and get them via cookies.get(key)

Cacheing in Route Handlers
they are cached by default when using the GET method with the Response object in Next.js
upon running in production, a get request is done once then cached into the browser. This means that upon multiple reloads, the data remains the same
to opt out of the cacheing, you have to enable dynamic mode in the Segment Config Option. The syntax is export const dynamic = "force-dynamic" (it was "auto" by default)
there are other ways to opt out of cacheing as well. These include using the Request object with the GET method, employing dynamic functions like headers() and cookies() as well as any other HTTP method other than GET

Middleware
it is a powerful feature in nextjs that offers a robust way to intercept and control the flow of request and responses within your applications
this is done at the global level, enhancing features like redirection, URL rewrites, authentication, headers and cookeis management and more
middleware allows us to specify paths where it will be active
- custom matcher config 
- conditional statements
the middleware takes in a request of type NextRequest and returns a response of type NextResponse
initialising the matcher key in the config object to match the url for which the middleware is to be applied to tells nextjs when it should be executed
alternatively, this can be done conditionally via request.nextUrl.pathname matching
instead of using NextResponse.redirect, NextResponse.rewrite would keep the url pathname the same
for middleware related to cookies, you can first check whether the cookie exists already. If so, let it be. But if not, set it via response.cookies.set(key, value)
middleware can be used to manipulate headers as well

####################

Rendering
this is the process that transforms code you write into user interfaces
in nextjs, choosing the right time and place to do this rendering is vital for building a performant application like CSR, SSR, RSCs
to understand rendering in nextjs, we would first have to understand how rendering in react first works

Rendering in React
React was the go to library for creating single page applications (SPAs)
in a typical SPA, the client will first send a request to the server. The server then returns HTML and JS references. A request is made to this JS reference and the JS is downloaded.
the downloaded JS then generates HTML on your machine and inserts it into the DOM under the root element. This displays the user interface
this method of rendering where the component code is transformed into a user interface within the browser (the client) is known as client-side rendering (CSR)
however, there are some drawbacks to this approach:
 - generating HTML that contains only a single div tag is not optimal for SEO. Large bundle size and a waterfall of network request from deeply nested components would result in content not being rendered fast enough for a crawler to index
 - having the client handle all the work, such as fetching data, computing the UI, and making the HTML interactive would slow things down. Each additional feature would increase the size of the js bundle, prolonging the wait time for users to see the UI

it is thus why nextjs pivots towards server side rendering instead. 
in server side rendering (SSR), once the client sends the request, the server is the one that generates the HTML. This fully formed HTML element with JS references is then sent to the browser, though still non-interactive 
this overcomes the limitations of client-side Rendering
 - it improves SEO because search engines can easily index server-rendered content
 - users can immediately see the page HTML content, instead of a blank screen or a loading spinner
the interactivity, however, is put on hold until the client makes the request JS to download the JS code in the browser
this process where the initially static HTML page is brought to life is also known as hydration

Hydration
during hydration, react takes control in the browser. It reconstructs the component tree in memory based on the static HTML that was served
it carefully plans the placement of interactive elements within the tree. React then binds the necessary javascript logic to these elements
this involves initialising the application state, attaching event handlers for actions such as clicks and mouseovers, and setting up any other dynamic functionalities required for a fully interactive user experience

Server-side solutions
they include two different strategies:
 - Static Site Generation (SSG)
 SSG occurs at build time, when the application is deployed on the server. This results in pages that are already rendered and ready to serve. It is ideal for content that doesnt change often
 - Server-Side Rendering (SSR)
 SSR renders pages on-demand in response to user-requests. It is suitable for personalised content like social media feeds, where the HTML depends on the logged-in user

Drawbacks to SSR
 - you have to fetch everything before you can show anything
 components cannot start rendering and then pause to wait for data to be loaded
 if a component needs to fetch data from a database or another source, this fetching must be completed before the server can begin rednering the page
 this will delay the server's response time to the browser as it has to finish collecting all necessary data before the page can be sent to the client
 - you have to load everything before you can hydrate anything
 for successful hydration, where react adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree
 this means that all javascript for the components must be loaded on the client before you can start hydrating any of them
 - you have to hydrate everything before you can interact with anything
 react hydrates the component tree in a single pass, meaning that once it starts hydrating, it would stop until it is finished. These means that all componenets must be hydrated before you can interact with any of them
this creates am "all-or-nothing" waterfall problem where each issue must be resolved before moving on to the next one. This is inefficient if some parts of the app are slower than others

Suspense SSR
the use of the <Suspense> component allows for two major SSR features:
 - HTML streaming on the server
 - Selective hydration on the client
the use of suspense specifies to react that it does not have to wait for one component to be fully loaded before rendering all the other components. A fallback placeholder will be sent instead of the actual component while it is loading
suspense solves the first problem of having to fetch everything before you can show anything. If a particular section delays in the initial HTML, it can be seamlessly integrated into the stream later
to solve the problem of having to load all javascript, code splitting can be implemented
code splitting allows you to mark out specific code segments as not immediately necessary for loading, signalling your bundler to segregate them into seperate <script> tags
using React.lazy for code splitting, you can seperate the main section's code from the primary Javascript bundle
this means that code sections can be downloaded independently by the client, without having to waiat for the main section's code

Selective Hydration
the <Suspense> wrapper also tells react that you should not prevent the rest of the page from not just streaming but also from hydrating
this feature is called selective hydration where the hydration of sections are allowed as they become available, before the rest of the HTML and javascript code are fully downloaded
a heavy piece of JS now does not prevent the rest of the page from becoming interactive
hydration happens as soon as possible, without waiting for the hydration of others, overcoming the third drawback. React prioritised hydrations based on user interactions
there are, still, some drawbacks
 - even though the code is now streamed asynchronously, the user still must download the entire code of the webpage. Is this needed?
 - all components undergo hydration on the client side, even if they are not needed for interactivity. This can be inefficient and will extend loading times. Is this needed?
 - the bulk of javascript execution still takes place on the user's device. Should so much work be done on the user's device?

React Server Components (RSC)
this architecture aims to leverage the strengths of both server and client environments, optimising for efficiency, load times, and interactivity
the architecture introduces a dual-component model
 - client components
 - server components
they are distinguished based on where they execute and the environments they are designed to interact with

Client Components
they are typically rendered on the the client-side, but can also be rendered to HTML on the server, allowing users to immediately see the page's HTML content rather than a blank screen
these components primarily run on the client but can also be executed once on the server side for optimisation
client components have access to the client environment such as the browser, allowing them to use state, effects and event listeners to handle interactivity and access browser exclusive APIs like geolocation and local storage
they arnt new, the naming simply helps to differentiate these components with the newly introduced server components

Server Components
these are the newly design components that stays on server and is not downloaded by the client
benefits:
 - having large dependencies to remain server-side benefits users with slower internet connection and less capable devices. They no longer need to download, parse and execute Javascript
 - removes the hydration step, speeding up interactions
 - having direct access to server-side resources like databases and file systems, server components enable efficient data fetching and rendering without needing additional client-side processing
 compute intensive tasks can be done on the server and only interactive UI components are sent to the client
 - security is enhanced by keeping sensitive data and logic away from the client side
 - they enhance data fetching by eliminating client-server waterfalls where a child component cannot load until the parent component is loaded. This sequential round trips are shift to the server side
 - rendering on the server allows for cacheing, improving performance and reducing cost
 - initial page load and first contentful paint are significantly improved. By generating HTML on the server, pages become immediately visible to users without the delay of downloading, parsing and executing JS
 - SEO is improved
 - server components can be streamed to the client, allowing users to start seeing parts of the page earlier, eliminating the need to wait for the entire page to finish rendering on the server

 RSC = server components take charge of data fetching and static rendering while client components are tasked with rendering the interactive element of the application. All while using a single language, a single framework and a cohensive set of APIs 

Rendering Lifecycle
for RSC, there are three components that need considering: the browser(client) and server, Next.js(framework) and React(library)
lifecycle:
1. the browser initiates a request to nextjs
2. the nextjs app router matches the request to a server component
3. nextjs then instructs react to render that server component
4. react renders the components together with any other child components, also known as the RSC payload (json in network tab in the browser). If there are any components in suspense, rendering of that component is paused and the fallback component is sent instead
5. client components and their instructions are prepared for later in the lifecycle
6. RSC payload is sent back, generating HTML on the server
7. this HTML is streamed to the browser to immediately show a non-interactive preview of the route. The RSC payload is streamed simultaneously
8. the browser uses the streamed HTML and RSC payload to progressively render the UI
9. once all the loading is done, the final UI state is rendered to the user
10. the final UI then undergoes hydration to output the interactive UI

RSC Update Sequence
1. the browser will request a refetch to nextjs
2. nextjs will match this request to a server component
3. it instructs react to render the server component
4. same as before, react renders the components and child components and sends them as the RSC payload to nextjs
5. nextjs then sends the RSC to the browser
6. on receiving the response, nextjs triggers a rerender of the route
7. react then triggers a reconsolidation of the output on screen. Because jsx is returned, react can just update the DOM will keeping the other components unaffected

Server Rendering Strategies
 - Static rendering
 - Dynamic rendering
 - Streaming

Static Rendering
it is a server rendering stategy where we generate HTML pages at the time of building our application
this allows a page to be built once, cached by a CDN then served to the client almost instantly
this optimisation enables you to share the result of the rendering work among different users, resulting in a significant performance boost for your application
it is particularly useful for blog pages, e-commerce product pages, documentation and marketing pages

static rendering is the default rendering strategy in the app router
all routes are automatically prepared at build time without additional setup

Production server vs development server
for production, an optimised build is created once, and you then deploy that build. Code changes cannot be made on the fly
for development, it is focused on the development experience
in production, a page will be pre-rendered once when we run the build command while in developement, a page will be pre-rendered for every request

Building
the command "npm run build" creates an optimised build of the application
the terminal output displays three columns of information:
- route: the route in the app
- size: size of the assets downloaded when navigating to the route on the client-side
- first load JS: size of assets downloaded when loading the page from the server
there is also a first load JS shared by all: this includes the global css, runtime code, framework code, modules code, route code, etc
routes prerendered in build time as static HTML content are denoted with circles
built output is generated into the .next folder which contains the necessary files and folders to serve the request of the browser
the app folder contains various components:
 - .html files are files of the static HTML routes
 - .rsc files are payloads of the various react server components. It is a compact string representation of the virtual DOM
    - server components contain the rendered result of a server component
    - client components contain instructions on where client components should be rendered along with references to their javascript files

Prefetching
this is a technique used to preload a route in the background before a user navigates to it
the routes are automatically prefetched as they become visible in the user's viewport
for static routes, the entire route is prefetched and cached by default
pages are already loaded, ready for instant navigation
this also means that the static page remains the same even when reloaded

Dynamic Rendering
this is a server rendering strategy where routes are rendered for each user at request time
it is needed for routes where data is personalised to the user or contains information that can only be known at request time, such as cookies or the URL search parameters
some examples are new websites, personalised e-commerce pages and social media feeds
the moment a dynamic function is discovered, nextjs will automatically switch to dynamically rendering the whole route
some dynamic functions include: cookies(), headers() and searchParams
dynamic routes are indicated with a lambda symbol in the build log in the console

Streaming
this is a strategy that allows for progressive UI rendering from the server
work is divided into chunks and streamed to the client as soon as it is ready
this enables users to see parts of the page immediately, before the entire content has finished rendering
streaming significanly improves botht th initial page loading performance and the rendering of UI elements that rely on slower data fetches, which would otherwise block the rendering of the entire route
the idea of streaming utilises the <Suspence> component integrated into the nextjs app router

Server and Client composition patters
server components:
 - fetching data
 - directly accessing backend resources
 - protecting sensitive information
 - keeping dependencies server-side, reducing client-side javascript
client components:
 - adding interactivity
 - handling event listeners like onClick(), onChange(), etc
 - manaing state and lifecycle effects like useState(), useReducer(), etc
 - using browser-exclusive APIs
 - using custom hooks
 - using react class components

Server component patterns:
 - Server-only code
 certain code is intended to execute only on the server
 this includes using modules or functions that use multiple libraries, environment variables, interact with databases, or process confidential information
 sometimes code meant only for the server can unintentionally end up in the client
 this leads to a bloated bundle size, exposed secret keys, database queries and sensitive business logic
 it is therefore cruicial to seperate server-only code from client-side code so as to protect an application's security and integrity

 the server-only package will indicate errors to developers in the event that they accidentally import one of these modules into a client component
 you'll have to import the server-only with the syntax import "server-only"

Third-party packages
packages in the ecosystem are beginning to add the "use-client" directive to their components that rely on client-only features
however, many npm packages have yet to integrate this directive
this absence of "use-client" meants that while they work correctly as client components, they may encounter issues within server components
to address this, you could wrap these third party components that rely on client-only features in your own client components
some libraries will have problems when you do not specify the "use-client" directive as they use client components. However, this would mean that these libraries cannot be used in server routes and all server functionality will be lost
you'll have to nest the client component in a secondary server component, before rendering both together in another server component

Context Providers
these providers are usually rendered in the root of the application to share global application state and logic
however, since react conext is not supported in server components, attempting to create a context at the root of the application will result in an error
to address this, you can create a context and render its provider inside a seperate Client Components

Client-only code
it is equally important to confine functionality to the client side
client-only code interacts with browser-specific freatures like the DOM, the window object, localStorage, etc, which are not available in the server
ensuring this code is executed only on the client side prevents errors during server rendering
this can be ensured via a package called client-only
it is similar to the server-only module where when the client-only module is imported, a build error will be returned if it is mistakenly included in server-side code

Client Component Placement
to compensate for server component not being able to manage state and handle interactivity, you'll create client components
it is advised that client components are keep lower in the component tree
when you make a parent componenet a client component, all its children components will become client components. You can think of client components as a boundary, the moment one component crosses the boundary, all its children become client components
the ideal scenario is for the leaf componenents to be client componenets

Interleaving 
case 1: importing a server component inside a server component
the route will render without any issues
case 2: importing a client component inside a client componenet
the route will render without any issues
case 3: importing a client componenet inside a server component
the route will render without any issues
case 4: importing a server component inside a client componenet
this route will error. It is because any component inside a client component will be taken to be a client component. So you cannot import a server component into a client component
the work around is to pass the server component as a child prop into the client component

Data fetching
the app router uses React Server Components (RSC) architecture, which allows us to fetch data using either server components or client components
it is advantageios to fetch data using server components as they have direct access to server-side resources like databases or file systems
this makes use of the server's computational power and proximity to data sources for efficient data fetching and rendering but also minimises the need for client side processing
both client and server components can use data fetching techniques, however, server componenets are used more often
server components support various configurations for caching, revalidataing and optimising data fetching
on the clien side, data fetching is typically managed through third party libraries like tanstack query, which offers its own robust APIs

Fetching data with server components
The RSC architecture in the app router introductes support for async and await keywords in server components
this allows you to use the familiar Javascript await syntax by defining your component as an asynchronous function
this is the basis for data fetching in server components
you can use JSONPlaceholder.typicode as a mosck server

Loading and Error statements
traditionally in react, loading and error states are managed by creating seperate variables and conditionally rendering UI based on their values
to implement a loading state, define and export a react component in loading.tsx
for handling errors, define and export a react component in error.tsx

Data Cacheing
creating a async server function that fetches data from a server. Upon entering the route, you will be rendered the data.
something you might notice is that when you edit the data on the database and access the route again, the data served will remain the same even tho it had been altered
naxtjs automatically caches the value of fetch(), this improves performance and minimises cost. the initial result is stored in the data cache of the server and reused in every subsequent request

Data fetching flow:
the first time a fetch request is made during rendering, nextjs checks the data cache for a cache response
    - if it is found, the cached response is returned immediately
    - if not found, the result is made to the data source then stored in the data cache
        when the same request is made, the cached response is returned without the need to call the data source
this cached response is stored in the cache file in the .next file
do note that the cache is a server side persistent cache and not a browser cache. This means that when you access the route via a different browser, the cache response remains

Opting out of cacheing
for inidividual data fetches, you can opt out of cacheing by seting the cache option to no-store. This is the most straight forward method and the syntax is as such:
const response = await fetch('url', {cache: "no-store"})
once you specify the no-store option for a fetch request, subsequenct fetch requests will also not be cached. this means that the positions of the fetch functions matter in the context of cache: "no-store"
alternatively, you can specify a route level configuration via fetchCache = "default-cache". This is a route segment configuration
by default, ts that occur before any dynamic function like cookies(), headers(), searchParams, are used and will not cache requests found after dynamic functions

Request memoization
this technique that deduplicates requests for the same data within a single render pass
this approach allows for re-use of data in a react component tree, prevents redundant network calls and enhances performance
for the initial request, data is fetched from an external source and the result is stored in memory
subequent requests for the same data within the same reder pass retrieve the result from memory, bypassing the need to make the request again
this not only enhances performance, it also simplifies data fetching within a component tree
then the same data is needed across different components in a route, it eliminates the need to fetch data at the top of the tree and pass props between Components
instead, data can be fetched directly within the components that require it, without concerns about the performance implications of multiple network request for the same data
it doesnt refetch a request and merely reuses the request higher up the component tree

Memoization flow
1. the url is hit by the browser
2. a fetch request is made to the server
3. it checks in memory whether the same request of that particular url has already been made
4. if none, it then checks the data cache
5. if none, it then proceeds to fetch the data from the data source
6. when another request is made to the same url, the request is memoizated and returned, without the need to fetch from the data cache or the data source

request memoization is a react feature, not specifically a nextjs feature
memoization only applies to the GET method in fetch requests
it also only applies within a react component tree. it does not extend to fetch requests in route handlers as they are not part of the react component tree
for cases where fetch is not suitable, like in database clients, CMS clients or GraphQL clients, you can use the reach cache function to memoize requests

Time-based data revalidation
based on what has been mentioned, caching seems binary, either cache or no cache
however, in real world application, there are scenarios where a middle ground is required
for example, an event listings page might have event details such as schedule or venue information that change occasionally
in this case, it is acceptable to fetch updataed data once every hour as freshness is not critical
this is where revalidation or time-based revalidation comes in. It is the process where nextjs automatically revalidates data after a certain amount of time

to enable revalidation: const response = await fetch("url", {next: {revalidate: 10}})
you could also set the revalidate route segment configuration to establish the default revalidation time for a layout or page: export const revalidate = 10. This does not overwrite revalidate options in fetch requests
regarding revalidation frequency, the lowest revalidation time across each layout and page of a single route will determine the revalidation frequency of the entire route

Client-side data fetching
for CSR, you'll have to use tanstack query to get all the features related to server side data fetching
