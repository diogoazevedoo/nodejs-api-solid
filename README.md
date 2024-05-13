# App

GymPass style app.

## Functional Requirements

- [x] User registration must be possible;
- [x] User authentication must be possible;
- [x] It must be possible to obtain the profile of a logged-in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [x] Users should be able to access their check-in history;
- [x] Users should be able to search for nearby gyms (up to 10km);
- [x] Users should be able to search for gyms by name;
- [x] Users should be able to check into a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## Business Rules

- [x] Users must not be able to register with a duplicate email;
- [x] Users cannot make 2 check-ins on the same day;
- [x] Users cannot check in if they are not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] A gym can only be registered by administrators;

## Non-Functional Requirements

- [x] User passwords need to be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);
