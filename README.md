# Afterlife Horizon Bot Project

The website for the discord bot created in ReactJS and typescript

## Requirements

-   NodeJS 18.15.0 or higher

## features

-   Ability to control the music played by the bot in a discord channel.
-   Check various leaderboards

## Installation

1.  Add all the variables :

    ```bash
    nano ./frontend/.env
    ```

    **`.env`**

    ```bash
    VITE_REDIRECT_URI=""    # url of your website with / at the end
    VITE_SUPABASE_URL=""    # url of your supabase project
    VITE_SUPABASE_KEY=""    # public key from supabase
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Build the frontend:

    ```bash
    npm run build
    ```
