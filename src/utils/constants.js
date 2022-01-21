export const UKLocation = { lat: 54.4747043, lng: -4.9561606 };

/**
 * User roles
 */
export const userRoles = {
  ROLE_ADMIN: 1,
};

export const dateFormats = ['DD MMM YYYY HH:mm', 'DD MMM YYYY'];

export const imageFormats = ['jpg', 'jpeg', 'png'];

export const priceLevelOptions = [
  {
    value: '$',
    labelSuffix: '(usually $10 and under)',
  },
  {
    value: '$$',
    labelSuffix: '(usually between $10-$25)',
  },
  {
    value: '$$$',
    labelSuffix: '(usually between $25-$45)',
  },
  {
    value: '$$$$',
    labelSuffix: '(usually $50 and up)',
  },
];

export const userType = [
  {
    value: 1,
    label: 'Admin',
  },
  {
    value: 2,
    label: 'Pilot',
  },
  {
    value: 3,
    label: 'Owner',
  },
];

export const userRolesStr = {
  1: 'Admin',
  2: 'Pilot',
  3: 'Owner',
};

export const regex = {
  simplePhone: /[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*/,
  breakLine: /\r\n|\r|\n/g,
};

export const moderationTypes = {
  1: 'Addition',
  2: 'Claim',
  3: 'Update',
  4: 'Reported pad',
  5: 'Moderation requested',
  6: 'Reported review',
  7: 'Reported upload',
  8: 'Converted',
};

export const containerSizes = ['sm', 'lg'];
