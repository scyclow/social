// @flow

// fuck it
// export opaque type UserId: string = string;
export type UserId = string;

export type User = {
  id: UserId,
  name: string,
  onlineNow: boolean
};

export type Users = {
  [UserId]: User
};

export const createUserId = (id: string): UserId => id
