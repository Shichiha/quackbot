Not a selfbot! 😁

# how to use

1. install npm dependencies
1. add what needs to be added in `config.json` 
1. `npm start` (needs typescript for compiling)

# development

development should be pretty intuitive.

Commands are in `src/Commands`, events are in `src/Events`

Handlers for both are in `src/CommandHandler.ts` and `src/EventHandler.ts` respectively.

# config.json
example config

```json
{
    "token": "{insert your NOT selfbot token here!}",
    "prefix": "!",
    "activities": [
        "counting fingers",
        "on the steps"
    ],
    "blacklist": [
        "926104536723111976",
        "959905847268495401",
        "1026863169836163134"
    ],
    "admin": ["703461363573456928"]
}
```