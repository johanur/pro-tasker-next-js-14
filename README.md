# ProTasker

Introducing ProTasker, a simple To-do board app built with <strong>Next.js 14</strong> and <strong>Supabase</strong> to streamline task management experience.

## Features

- Authentication & Authorization
- Create Categories
- Quick To-do Entry
- Organize To-do Listing
- Edit To-do with ease
- Drag and Drop Functionality
- Expiry Date Visibility
- Ability to Track and View Todo Category Update History

## Technology used

### Frontend

<table>
  <tr>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=next" />
      <br>Next.js
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=react" />
      <br>React
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=ts" />
      <br>TypeScript
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=tailwind" />
      <br>Tailwind CSS
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=html" />
      <br>HTML
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=css" />
      <br>CSS
    </td>
  </tr>
</table>

### Backend

<table>
  <tr>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=supabase" />
      <br>Supabase
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=postgres" />
      <br>PostgreSQL
    </td>
  </tr>
</table>

<br>

## Technical Concepts

### Architecture Overview

The project is designed with a clear separation between its frontend and backend components. The frontend is built using <strong>Next.js(v14)</strong> with the new app routing, server components and server actions features. The application is styled with shadcn/ui and Tailwind CSS. On the backend, <strong>Supabase</strong> serves as a robust backend-as-a-service (BaaS) and <strong>PostgreSQL</strong> acts as the database management system.

### Frontend:

- Utilized the latest <strong>Next.js(v14</strong>) built on top of <strong>React(v18)</strong> for building user interfaces also integrating server-side rendering for enchance performance. This approach significantly improved the website's speed and user experience, as server-side rendering pre-generates pages on the server, reducing load times for users. An alternate approach could have involved traditional client-side rendering (CSR), where pages are generated on the client side. However, this might result in longer initial loading times, impacting user experience.
- Leveraged <strong>Next.js(v14</strong>) new App routing system to build file-based routing and use feature such as <strong>Server Components</strong> and <strong>Server Actions</strong>. Utilized the new server components and server actions of Next.js(v14) to fetch data directly on the server and rendered in the server without zero JS being sent to the browser which helps reducing the bundle size and improving performance. Alternative / previous approach of client component was to fetch data from the server and a javascript bundle containing states, events is sent to the browser.

- Implemented Functional Components for concise and modular UI development

- Implemented <strong>React Hooks</strong> for efficent state management and side effects in functional components

- Utilized the <strong>React Context API</strong> to manage state within the component tree, enhancing communication between components and reducing the need for prop drilling. While an alternative approach could have involved using global state management tools like Redux or Zustand for more efficient state management across the entire application or among sibling components, the context API proved sufficient given the project's scope

- Implemented the <strong>Drag and Drop HTML API</strong> to facilitate the seamless movement of todos between different categories.

- Utilized local storage for maintaining the todo description state during the editing process, ensuring its persistence and retrieval even after a page refresh. Another approach could have been used is session storage but it will only retains data for the duration of a page session

- Calculated remanining days of a to-do by subtracting expiry date with current date in the frontend for user-friendly notification. Alternatively, utilizing <strong>PL/pgSQL</strong> functions in the backend (Supabase) would ensure consistency across clients, reduce client load, enforce secure logic

- Adopted Tailwind CSS for a utility-first styling approach, accelerating development through pre-designed utility classes to ensure consistency and responsiveness.

### Backend:

- Integrated <strong>Supabase</strong> as the backend, utilizing Supabase Auth for user authentication and authorization

- Supabase's Auth module streamlines user authentication using PostgreSQL's built-in functionality. To integrate this module, developers install two key packages initially: `@supabase/supabase-js` for interacting with Supabase and, for server-side rendering frameworks, `@supabase/ssr`. Once installed, the authentication process begins with users logging in through their email addresses and passwords. Supabase validates these credentials against entries in the `users` table and, upon successful verification, generates an access token (JWT) containing the user's UUID and other relevant details. Following a successful login, Supabase creates a session object, incorporating the user's UUID, role, and additional information. This session object is then stored in the `sessions` table, associated with the user's ID. To manage the user's session, Supabase sets thegenerated access token (JWT), refresh token and other relevant information as a cookie in the user's browser. The crucial role of this cookie is to sustain the user's session. Additionally, Supabase middleware ensures effective session management and access control by refreshing sessions before loading Server Component routes.

- For managing authorization, Supabase utilizes PostgreSQL's Row Level Security (RLS) feature. RLS enables the definition of policies that control access to rows within tables based on the user's identity. The initial step involves enabling RLS for the specific table where these policies will be implemented. Once RLS is activated,  we have the flexibility to create policies that outline which users have access to the data and the permissible actions (CREATE, READ, UPDATE, DELETE) they can undertake.

- Used Supabase database, powered by <strong>PostgreSQL</strong> to store category, to-do information

### Programming Language:

- Implemented <strong>TypeScript</strong> for static typing in frontend
- Enforced strong typing to catch potential errors during development
- By clearly defining and enforcing strong typing, it can help us catch unexpected inputs or manipulations, reducing the chances of security issues related to data integrity and validation.

<br>

## Database Diagram

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/1ceb0fb4-ea3c-4eed-b3e3-1bb01e01faed">
</kbd>

<br>


## Data Flow Diagram 

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/c13553ca-56bb-44d0-990f-d7297f032094">
</kbd>

<br>

## Prerequisites

Before you dive into ProTasker, ensure that you have the following prerequisites installed on your computer:

- [Node.js](https://nodejs.org/): React applications rely on Node.js for development and package management.

## Required Node Version

`Node.js Version: ^18.17`

## Getting Started

To run the application, follow these simple steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/JohanurRahman/pro-tasker-next-js.git

   ```

2. Navigate to the project directory:

   ```bash
   cd pro-tasker-next-js

   ```

3. Install project dependencies:

   ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install

   ```

4. Create a environemnt file in the root of the project and paste the keys from <strong>Supabase</strong> project:

   ```bash
   touch .env
   ```

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-secret-key

   ```

5. Launch the development server:

   ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
   ```

## Final Step

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br>

## App Preview

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/d7d33da6-be39-4090-adce-4eaccde1db91">
</kbd>

<hr>

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/a38074ca-c0e9-4127-ab3a-7b44b4e45b34">
</kbd>

<hr>

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/d6c4b534-44b5-4c33-812a-87febfbb3251">
</kbd>

<hr>

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/50ea428a-6449-4a74-a6d9-488e4428b3ce">
</kbd>

<hr>

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/67b35b92-1257-4bba-b62d-4c16593d5694">
</kbd>

<hr>

<kbd>
  <img src="https://github.com/JohanurRahman/pro-tasker-next-js/assets/42015613/2a160f30-1baa-4440-b9f2-2c27cf943d61">
</kbd>

