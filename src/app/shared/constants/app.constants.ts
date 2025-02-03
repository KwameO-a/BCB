import { environment } from 'src/environments/environment';
import { IRequirement } from '../models/requirements.model';

export class AppConstant {
  static APP_NAME = 'BCC SELF SERVICE';
  static ORIGINATOR_INSTITUTION_ID = 'GH1035';
  static PARTICIPANT_TYPE = 'BANK';
  static TRANSFER_CURRENCY = 'GHS';

  static DEFAULT_ERROR_MESSAGE = 'FAILED, PLEASE TRY AGAIN';
  static SETUP_DEFAULT_MESSAGE =
    'You have not been setup on this application. Please setup and try again';
  static DISMISS = 'Dismiss';
  static ERROR_TRY_AGAIN = 'Error occured. Please Try again';
  static FAILED_SIGN_IN = 'Failed signing in user';
  static SUCCESS_CODE = '000';

  static TRNX_APPROVED = 'PPP';

  static TRNX_YES = 'YES';
  static TRNX_NO = 'NO';

  static BRANCH_CODE = 'DEFAULT';
}

export class Roles {
  public static MAKER = 'MAKER';
  public static CHECKER = 'CHECKER';
  public static ADMIN = 'ADMIN';
}

export enum PROGRESS_STATE {
  LOADING = 1,
  FAILED = 2,
  DONE = 3,
  COMPLETE = 4,
}

export enum REQUEST_STATE {
  ALL = 'ALL',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  AUTHORISED = 'AUTHORISED',
  REJECTED = 'REJECTED ',
}

export enum TRANSACTION_TYPE {
  INWARD = 'INWARD',
  OUTWARD = 'OUTWARD',
}

export enum DISPLAY_TYPE {
  GRID = 'GRID',
  LIST = 'LIST',
}

export const RESIDENCY_TYPE = ['Resident', 'Non-Resident'];

export const IDENTIFICATION_TYPE = [
  'Ghana Card (Ghanaians)',
  'Passport (Non-Ghanaians)',
];

export const PACKAGES_LIST = [
  'Sole Proprietor Account Opening',
  'Limited Liability Account Opening',
  'Partnership Account Opening',
  'External Company Account Opening',
  'Clubs, Welfare, Associations',
  ' NGOs Account Opening',
  'School Account Opening',
];

export const SOURCE_OF_FUNDS_LIST = [
  'Proceeds from Sales',
  'Shareholders Funds',
  ' Profit from Business Operations',
  'Personal funds Directors/ Owner',
  'Other',
];

export enum PACKAGES {
  SOLE_PROPRITOR = 'ca3bf42e-af1a-11ed-afa1-0242ac120002',
  LIMITED_LIABILITY = 'ca3c06da-af1a-11ed-afa1-0242ac120002',
  PARTNERSHIPS = 'ca3c0d1a-af1a-11ed-afa1-0242ac120002',
  EXTERNAL_COMPANY = 'ca3c09c8-af1a-11ed-afa1-0242ac120002',
  NGOS_ACCOUNT = 'ca3c14cc-af1a-11ed-afa1-0242ac120002',
  SCHOOL_ACCOUNT = 'ca3c129c-af1a-11ed-afa1-0242ac120002',
}

const assetsUrl = environment.assetsUrl;
export const PACKAGE_TYPES: IRequirement[] = [
  {
    color: '#329B7F',
    icon: assetsUrl + '/assets/images/sole-icon.png',
    id: PACKAGES.SOLE_PROPRITOR,
    name: 'Sole Proprietor Account Opening',
    description:
      'Also referred to as a sole trader or a proprietorship, is an unincorporated business that has just one owner is personally responsible for its debts',
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              'Only Ghana Card required for ID for Ghanaians.',
              'Proof of Business Location',
              'Proof of Residence of Proprietor/Executives/Directors/Signatories',
              'One Passport size photograph',
              'Bank Mandate Form',
              'Only passport are required for foreigners who do not reside in Ghana',
              'Passport, permit and non-citizen Ghana card are require for foreigners who resides in Ghana',
            ],
          },
        ],
      },
      {
        title: 'Specific Requirements',
        data: [
          {
            heading: '',
            data: [
              'Certificate of Registration',
              'Form A',
              'Form D (any amendment to registration documents',
              'Annual renewal receipt',
            ],
          },
        ],
      },
      {
        title: "'Additional Requirement for Subsidiary Sole Proprietor'",
        data: [
          {
            heading: '',
            data: ['Registration Documents of Parent Company', 'Form C'],
          },
        ],
      },
    ],
  },
  {
    color: '#AF2D55',
    icon: assetsUrl + '/assets/images/limited.png',
    name: 'Limited Liability Account Opening',
    description:
      'A private company whose owners are legally responsible for its debts only to the extent of the amount of capital they invested',
    id: PACKAGES.LIMITED_LIABILITY,
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              'Certificate of Incorporation',
              'Certificate to Commence Business',
              'Company Regulation',
              'Form Three(3)',
              'Board Resolution',
              'Mandate/Signature Card',
              'One Passport size photograph',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#5B1281',
    icon: assetsUrl + '/assets/images/partner.png',
    id: PACKAGES.PARTNERSHIPS,
    description:
      'A legal entity between two or more individuals who share management and profits.',
    name: 'Partnership Account Opening',
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              'Form A-Particulars of Incorporation',
              'Form B-Change of Partnership',
              'Form C-Certificate of Registration',
              'Partnership Agreement',
              'Board Resolution',
              'Mandate/Signature Card',
              'One Passport size photograph',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#E27C34',
    icon: assetsUrl + '/assets/images/external.png',
    name: 'External Company Account Opening',
    id: PACKAGES.EXTERNAL_COMPANY,
    description:
      'A body corporate which is incorporated outside the Republic of Ghana and which carries on business in the Republic of Ghana or which has an address in Ghana which is used regularly for the purposes of its business.',
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              'Certificate of Registration',
              'Form 20',
              'Power of Attorney',
              'Board Resolution',
              'Mandate/Signature Card',
              'One Passport size photograph',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#3062CE',
    icon: assetsUrl + '/assets/images/clubs.png',
    name: 'NGOs/Charities/Foundations and Religious Orgainisations',
    description:
      'A group of people/society dedicated to a particular interest or activity',
    id: PACKAGES.NGOS_ACCOUNT,
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: 'Limited by Guarantee - Registered',
            data: [
              'Certificate of Incorporation',
              'Certificate to Commence Business',
              'Regulations',
              'Form 3B',
            ],
          },
          {
            heading: 'Unregistered',
            data: [
              'Constitution endorsed by Executives',
              'Resolution/Regulations',
              'Social Welfare Certificate (if applicable)',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#2888D9',
    icon: assetsUrl + '/assets/images/school.png',
    name: 'School Account Opening',
    description: 'An institution setup for the business of educating students.',
    id: PACKAGES.SCHOOL_ACCOUNT,
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              "National ID (Passport/Voters ID/Driver's License)",
              'Proof of Business Location',
              'Proof of Residence of Proprietor/Executives/Directors/Signatories',
              'One Passport size photograph',
              'Bank Mandate Form',
            ],
          },
        ],
      },
      {
        title: '',
        data: [
          {
            heading: '',
            data: [
              "Certificate of Registration from Registrar Generals' Dept.",
              'Certificate of Registration from Ghana Education Service',
              'Accreditation documents from the National Accreditation Board (applicable to Professional Bodies)',
              'Board Resolution',
              'Form 3B - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
              'Form C & Rgistration documents of Parent Company - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#FFC107',
    icon: assetsUrl + '/assets/images/school.png',
    name: 'Informal Body/Associations',
    description:
      'A group of people/society dedicated to a particular interest or activity.',
    id: PACKAGES.SCHOOL_ACCOUNT,
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              "National ID (Passport/Voters ID/Driver's License)",
              'Proof of Business Location',
              'Proof of Residence of Proprietor/Executives/Directors/Signatories',
              'One Passport size photograph',
              'Bank Mandate Form',
            ],
          },
        ],
      },
      {
        title: '',
        data: [
          {
            heading: '',
            data: [
              "Certificate of Registration from Registrar Generals' Dept.",
              'Certificate of Registration from Ghana Education Service',
              'Accreditation documents from the National Accreditation Board (applicable to Professional Bodies)',
              'Board Resolution',
              'Form 3B - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
              'Form C & Rgistration documents of Parent Company - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#FF4500',
    icon: assetsUrl + '/assets/images/school.png',
    name: 'Deceased Estate & Trust/Attorney Trust',
    description:
      'A group of people/society dedicated to a particular interest or activity.',
    id: PACKAGES.SCHOOL_ACCOUNT,
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              "National ID (Passport/Voters ID/Driver's License)",
              'Proof of Business Location',
              'Proof of Residence of Proprietor/Executives/Directors/Signatories',
              'One Passport size photograph',
              'Bank Mandate Form',
            ],
          },
        ],
      },
      {
        title: '',
        data: [
          {
            heading: '',
            data: [
              "Certificate of Registration from Registrar Generals' Dept.",
              'Certificate of Registration from Ghana Education Service',
              'Accreditation documents from the National Accreditation Board (applicable to Professional Bodies)',
              'Board Resolution',
              'Form 3B - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
              'Form C & Rgistration documents of Parent Company - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
            ],
          },
        ],
      },
    ],
  },
  {
    color: '#47C4AC',
    icon: assetsUrl + '/assets/images/school.png',
    name: 'MMDAs. Account Opening',
    description:
      'A group of people/society dedicated to a particular interest or activity.',
    id: PACKAGES.SCHOOL_ACCOUNT,
    requirements: [
      {
        title: 'Requirements',
        data: [
          {
            heading: '',
            data: [
              "National ID (Passport/Voters ID/Driver's License)",
              'Proof of Business Location',
              'Proof of Residence of Proprietor/Executives/Directors/Signatories',
              'One Passport size photograph',
              'Bank Mandate Form',
            ],
          },
        ],
      },
      {
        title: '',
        data: [
          {
            heading: '',
            data: [
              "Certificate of Registration from Registrar Generals' Dept.",
              'Certificate of Registration from Ghana Education Service',
              'Accreditation documents from the National Accreditation Board (applicable to Professional Bodies)',
              'Board Resolution',
              'Form 3B - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
              'Form C & Rgistration documents of Parent Company - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
            ],
          },
        ],
      },
    ],
  },
];

/**
 *
   "ca3c086a-af1a-11ed-afa1-0242ac120002": {
    id : "ca3c086a-af1a-11ed-afa1-0242ac120002",
    description : "",
    name: 'Clubs, Welfare, Associations & NGOs Account Opening',
    requirements: [
      {
        title: "Requirements",
        data: [
          {
            heading: "",
            data: [
              "National ID (Passport/Voters ID/Driver's License)",
              'Proof of Business Location',
              'Proof of Residence of Proprietor/Executives/Directors/Signatories',
              'One Passport size photograph',
              'Bank Mandate Form',
            ]
          }
        ]
      },
      {
        title: 'Specific Requirements',
        data: [
          {
            heading: 'Limited by Guarantee - Registered',
            data: [
              'Certificate of Incorporation',
              'Certificate to Commence Business',
              'Regulations',
              'Form 3B',
            ],
          },
          {
            heading: "Unregistered",
            data: [
              'Constitution endorsed by Executives',
              'Resolution/Regulations',
              'Social Welfare Certificate (if applicable)',
            ],
          }

        ]
      }
    ]

  },
 */

export const RELATIONSHIP_MANAGERS_LIST = [
  'Sackey, Jemima Naa Adjeley ',
  'Agbeko, Peter P ',
  'Dordzie, Christian C ',
  'Annie Asimenu',
  'Veronica Adukpo',
  'Ali, Okasha O ',
  'Arthur, Ambrose Thompson',
  'Mensah Ofori-Osei, Sylvia ',
  'Gerald Koranteng',
  'Evelyn Boahen',
  'Johnson, Michael M ',
  'Yakubu, Issahaku ',
  'Bronya, Eric ',
  'Kwame Busia',
  'Agnes Ivy Bimpeh Harrison',
  'Muntaka Gali',
  'Mumuni Abubakari Amuquandoh',
  'Puopila Michael',
  'Philemon Sumbo',
  'Yaw Njorgnab',
  'Fouillard, Maud Kukua M ',
  'Doku, Richard Tetteh',
  'Alhassan, Eliasu E ',
];

export const SIGNATORY_TYPES_LIST = ['Type A', 'Type B', 'Type C'];

export const ACCOUNT_REASONS = [
  'Growth project',
  'Makes payment to suppliers and vendors',
  'Collection Solutions',
  'Salary Payments',
  'Send and receive cross-border payments',
  'Build a credit profile for your business',
  'Accurate and clean bookkeeping',
  'Tax guidance',
  'Business authenticity validation',
  'To leave a clear and accurate audit trail',
  'Establish credibility with your customers',
  'Limit your personal liability',
  'Closely monitor business progress',
  'Close proximity of branch to your business location',
  'Brand attraction',
  'Customer referrals',
  'Networking opportunities',
];
export const ACCOUNT_REASONS_LIST = ACCOUNT_REASONS.map((v, index) => {
  return { id: index, name: v };
});

export const COUNTRY_OF_INCORPORATION = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua &amp; Barbuda' },
  { code: 'AG', name: 'Antigua' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahama' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BV', name: 'Bouvet Island' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'VG', name: 'British Virgin Islands' },
  { code: 'BN', name: 'Brunei Darussalam' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BU', name: 'Burma (no longer exists)' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos (Keeling) Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CK', name: 'Cook Iislands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: 'Côte Divoire (Ivory Coast)' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'CS', name: 'Czechoslovakia (no longer exists)' },
  { code: 'YD', name: 'Democratic Yemen (no longer exists)' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'TP', name: 'East Timor' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands (Malvinas)' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'FX', name: 'France, Metropolitan' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'TF', name: 'French Southern Territories' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DD', name: 'German Democratic Republic (no longer exists)' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HM', name: 'Heard &amp; McDonald Islands' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IR', name: 'Islamic Republic of Iran' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'Korea, Democratic People Republic of' },
  { code: 'KR', name: 'Korea, Republic of' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Lao Peoples Democratic Republic' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libyan Arab Jamahiriya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macau' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova, Republic of' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'MS', name: 'Monserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'AN', name: 'Netherlands Antilles' },
  { code: 'NT', name: 'Neutral Zone (no longer exists)' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RE', name: 'Réunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russian Federation' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome &amp; Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SH', name: 'St. Helena' },
  { code: 'KN', name: 'St. Kitts and Nevis' },
  { code: 'PM', name: 'St. Pierre &amp; Miquelon' },
  { code: 'VC', name: 'St. Vincent &amp; the Grenadines' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard &amp; Jan Mayen Islands' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syrian Arab Republic' },
  { code: 'TW', name: 'Taiwan, Province of China' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania, United Republic of' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad &amp; Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks &amp; Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  {
    code: 'SU',
    name: 'Union of Soviet Socialist Republics (no longer exists)',
  },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom (Great Britain)' },
  { code: 'UM', name: 'United States Minor Outlying Islands' },
  { code: 'US', name: 'United States of America' },
  { code: 'VI', name: 'United States Virgin Islands' },
  { code: 'ZZ', name: 'Unknown or unspecified country' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City State (Holy See)' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Viet Nam' },
  { code: 'WF', name: 'Wallis &amp; Futuna Islands' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'YU', name: 'Yugoslavia' },
  { code: 'ZR', name: 'Zaire' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
];

export const COUNTRIES_LIST = COUNTRY_OF_INCORPORATION.map((v) => v.name);

export const ALL_INDUSTRY_LIST = [
  'GROWING OF NONPERENNIAL CROPS',
  'GROWING OF PERENNIAL CROPS',
  'PLANT PROPAGATION',
  'ANIMAL PRODUCTION',
  'MIXED FARMING',
  'SUPPORT ACT TO AGRICULTURE & POSTHARVEST CROP ACTS',
  'HUNTING, TRAPPING AND RELATED SERVICE ACTIVITIES',
  'SILVICULTURE AND OTHER FORESTRY ACTIVITIES',
  'LOGGING',
  'GATHERING OF NONWOOD FOREST PRODUCTS',
  'SUPPORT SERVICES TO FORESTRY',
  'FISHING',
  'AQUACULTURE',
  'MINING OF HARD COAL',
  'MINING OF LIGNITE',
  'EXTRACTION OF CRUDE PETROLEUM',
  'EXTRACTION OF NATURAL GAS',
  'MINING OF IRON ORES',
  'MINING OF NONFERROUS METAL ORES',
  'QUARRYING OF STONE, SAND AND CLAY',
  'MINING AND QUARRYING N.E.C.',
  'SUPPORT ACTIVITIES FOR PETROLEUM & NATURAL GAS MIN',
  'SUPPORT ACTIVITIES FOR OTHER MINING AND QUARRYING',
  'PROCESSING & PRESERVING OF MEAT & MEAT PRODUCTS',
  'PROCESSING & PRESERVING OF FISH &  FISH PRODUCTS',
  'PROCESSING AND PRESERVING OF FRUIT AND VEGETABLES',
  'MANUFACTURE OF VEGETABLE AND ANIMAL OILS AND FATS',
  'MANUFACTURE OF DAIRY PRODUCTS',
  'MANUFACTURE OF GRAIN MILL PRODUCTS, STARCHES/PROD',
  'MANUFACTURE OF OTHER FOOD PRODUCTS',
  'MANUFACTURE OF PREPARED ANIMAL FEEDS',
  'MANUFACTURE OF BEVERAGES',
  'MANUFACTURE OF TOBACCO PRODUCTS',
  'SPINNING, WEAVING AND FINISHING OF TEXTILES',
  'MANUFACTURE OF OTHER TEXTILES',
  'MANUFACTURE OF WEARING APPAREL, EXCEPT FUR APPAREL',
  'MANUFACTURE OF ARTICLES OF FUR',
  'MANUFACTURE OF KNITTED AND CROCHETED APPAREL',
  'TANNING & DRESSING OF LEATHER/LUGGAGE, H/BAGS, FUR',
  'MANUFACTURE OF FOOTWEAR',
  'SAWMILLING AND PLANING OF WOOD',
  'MANUFACTURE OF PRODUCTS OF WOOD/CORK/STRAW/PLAITIN',
  'MANUFACTURE OF PAPER AND PAPER PRODUCTS',
  'REPRODUCTION OF RECORDED MEDIA',
  'MANUFACTURE OF COKE OVEN PRODUCTS',
  'MANUFACTURE OF REFINED PETROLEUM PRODUCTS',
  'MANUFACTURE OF BASIC CHEMICALS/FERTILIZER/PLASTIC',
  'MANUFACTURE OF OTHER CHEMICAL PRODUCTS',
  'MANUFACTURE OF MAN-MADE FIBRES',
  'MANUFACTURE OF PHARMACEUTICALS, MEDICINAL/CHEMICAL',
  'MANUFACTURE OF RUBBER PRODUCTS',
  'MANUFACTURE OF PLASTICS PRODUCTS',
  'MANUFACTURE OF GLASS AND GLASS PRODUCTS',
  'MANUFACTURE OF NON-METALLIC MINERAL PRODUCTS N.E.C',
  'MANUFACTURE OF BASIC IRON AND STEEL',
  'MANUFACTURE OF BASIC PRECIOUS & NON-FERROUS METALS',
  'CASTING OF METALS',
  'MANUFACTURE OF STRUCTURAL METAL PRODUCTS, TANKS',
  'MANUFACTURE OF WEAPONS AND AMMUNITION',
  'MANUFACTURE OF OTHER FABRICATED METAL PRODUCTS',
  'MANUFACTURE OF ELECTRONIC COMPONENTS',
  'MANUFACTURE OF COMPUTERS AND PERIPHERAL EQUIPMENT',
  'MANUFACTURE OF COMMUNICATION EQUIPMENT',
  'MANUFACTURE OF CONSUMER ELECTRONICS',
  'MANUFACTURE OF NAVIGATING & CONTROL EQUIP; WATCHES',
  'MANUFACTURE OF IRRADIATION, ELECTROMEDICAL EQUIP',
  'MANUFACTURE OF OPTICAL INSTRUMENTS AND EQUIPMENT',
  'MANUFACTURE OF MAGNETIC AND OPTICAL MEDIA',
  'MANUFACTURE OF ELECTRIC MOTORS/GENERATORS/TRANSFOR',
  'MANUFACTURE OF BATTERIES AND ACCUMULATORS',
  'MANUFACTURE OF WIRING AND WIRING DEVICES',
  'MANUFACTURE OF ELECTRIC LIGHTING EQUIPMENT',
  'MANUFACTURE OF DOMESTIC APPLIANCES',
  'MANUFACTURE OF OTHER ELECTRICAL EQUIPMENT',
  'MANUFACTURE OF GENERAL PURPOSE MACHINERY EQUIPMENT',
  'MANUFACTURE OF SPECIAL-PURPOSE MACHINERY',
  'MANUFACTURE OF MOTOR VEHICLES',
  'MANUFACTURE OF BODIES FOR MOTOR VEHICLES, TRAILERS',
  'MANUFACTURE OF PART/ACCESSORIES FOR MOTOR VEHICLES',
  'BUILDING OF SHIPS AND BOATS',
  'MANUFACTURE OF TRAM/RAILWAY LOCOMOTIVES & R/STOCK',
  'MANUFACTURE OF AIR, SPACECRAFT & RELATED MACHINERY',
  'MANUFACTURE OF MILITARY FIGHTING VEHICLES',
  'MANUFACTURE OF TRANSPORT EQUIPMENT N.E.C.',
  'MANUFACTURE OF FURNITURE',
  'MANUFACTURE OF JEWELLERY, BIJOUTERIE & SIMILAR',
  'MANUFACTURE OF MUSICAL INSTRUMENTS',
  'MANUFACTURE OF SPORTS GOODS',
  'MANUFACTURE OF GAMES AND TOYS',
  'MANUFACTURE OF MEDICAL/DENTAL INSTRUMENTS/SUPPLIES',
  'OTHER MANUFACTURING N.E.C.',
  'REPAIR OF FABRICATED METAL PRODUCTS, MACHINE/EQUIP',
  'INSTALLATION OF INDUSTRIAL MACHINERY AND EQUIPMENT',
  'WATER COLLECTION, TREATMENT AND SUPPLY',
  'SEWERAGE',
  'WASTE COLLECTION',
  'WASTE TREATMENT AND DISPOSAL',
  'MATERIALS RECOVERY',
  'REMEDIATION ACTS & OTHER WASTE MNGMNT SERVICES',
  'CONSTRUCTION OF BUILDINGS',
  'CONSTRUCTION OF ROADS AND RAILWAYS',
  'CONSTRUCTION OF UTILITY PROJECTS',
  'CONSTRUCTION OF OTHER CIVIL ENGINEERING PROJECTS',
  'DEMOLITION AND SITE PREPARATION',
  'ELECTRICAL, PLUMBING & CONSTRUCTION INSTALLATIONS',
  'BUILDING COMPLETION AND FINISHING',
  'OTHER SPECIALIZED CONSTRUCTION ACTIVITIES',
  'SALE OF MOTOR VEHICLES',
  'MAINTENANCE AND REPAIR OF MOTOR VEHICLES',
  'SALE OF MOTOR VEHICLE PARTS AND ACCESSORIES',
  'SALE, MAINTENANCE & REPAIR OF MOTORCYCLES & PARTS',
  'WHOLESALE ON A FEE OR CONTRACT BASIS',
  'WHOLESALE OF AGRICULTURAL RAW MATERIALS/ANIMALS',
  'WHOLESALE OF FOOD, BEVERAGES AND TOBACCO',
  'WHOLESALE OF HOUSEHOLD GOODS',
  'WHOLESALE OF MACHINERY, EQUIPMENT AND SUPPLIES',
  'OTHER SPECIALIZED WHOLESALE',
  'NON-SPECIALIZED WHOLESALE TRADE',
  'RETAIL SALE IN NON-SPECIALIZED STORES',
  'RETAIL SALE OF FOOD, BEVERAGES & TOBACCO',
  'RETAIL SALE OF AUTOMOTIVE FUEL',
  'RETAIL SALE OF ICT EQUIPMENT IN SPECIALIZED STORES',
  'RETAIL SALE OF OTHER HOUSEHOLD EQUIPMENT',
  'RETAIL SALE OF CULTURAL & RECREATION GOODS',
  'RETAIL SALE OF OTHER GOODS IN SPECIALIZED STORES',
  'RETAIL SALE VIA STALLS AND MARKETS',
  'RETAIL TRADE NOT IN STORES, STALLS OR MARKETS',
  'TRANSPORT VIA RAILWAYS',
  'OTHER LAND TRANSPORT',
  'TRANSPORT VIA PIPELINE',
  'SEA AND COASTAL WATER TRANSPORT',
  'INLAND WATER TRANSPORT',
  'PASSENGER AIR TRANSPORT',
  'FREIGHT AIR TRANSPORT',
  'WAREHOUSING AND STORAGE',
  'SUPPORT ACTIVITIES FOR TRANSPORTATION',
  'POSTAL ACTIVITIES',
  'COURIER ACTIVITIES',
  'SHORT TERM ACCOMMODATION ACTIVITIES',
  'RECREATIONAL VEHICLE/TRAILER PARKS & CAMPING GROUN',
  'OTHER ACCOMMODATION',
  'RESTAURANTS AND OTHER FOOD SERVICE ACTIVITIES',
  'FOOD SERVICE CONCESSION ACTIVITIES',
  'CATERING ACTIVITIES',
  'CONTRACT FOOD ACTIVITIES',
  'BEVERAGE SERVING ACTIVITIES',
  'PUBLISHING OF BOOKS, PERIODICALS & OTHER SIMILAR',
  'SOFTWARE PUBLISHING',
  'MOTION PICTURE, VIDEO & TV PROGRAMME ACTIVITIES',
  'SOUND RECORDING & MUSIC PUBLISHING ACTIVITIES',
  'RADIO BROADCASTING',
  'WIRED TELECOMMUNICATIONS ACTIVITIES',
  'WIRELESS TELECOMMUNICATIONS ACTIVITIES',
  'SATELLITE TELECOMMUNICATIONS ACTIVITIES',
  'OTHER TELECOMMUNICATIONS ACTIVITIES',
  'WEB PORTALS, DATA PROCESSING, HOSTING & RELATED',
  'INFORMATION TECHNOLOGY SERVICE ACTIVITIES',
  'OTHER INFORMATION SERVICE ACTIVITIES',
  'MONETARY INTERMEDIATION',
  'ACTIVITIES OF HOLDING COMPANIES',
  'TRUSTS, FUNDS AND OTHER FINANCIAL VEHICLES',
  'OTHER FINANCIAL INTERMEDIATION',
  'INSURANCE',
  'REINSURANCE',
  'PENSION FUNDING',
  'ACTIVITIES AUXILIARY TO FINANCIAL INTERMEDIATION',
  'ACTIVITIES AUXILIARY TO INSURANCE/ PENSION FUNDING',
  'FUND MANAGEMENT ACTIVITIES',
  'REAL ESTATE ACTIVITIES WITH OWN OR LEASED PROPERTY',
  'REAL ESTATE ACTIVITIES ON A FEE OR CONTRACT BASIS',
  'LEGAL ACTIVITIES',
  'ACCOUNTING, BOOKKEEPING, AUDITING; TAX CONSULTANCY',
  'ACTIVITIES OF HEAD OFFICES',
  'MANAGEMENT AND MANAGEMENT CONSULTANCY ACTIVITIES',
  'ARCHITECTURAL & ENGINEERING ACTIVITIES & RELATED',
  'TECHNICAL TESTING AND ANALYSIS',
  'RESEARCH/DEV ON  NATURAL SCIENCES & ENGINEERING',
  'RESEARCH/DEV ON SOCIAL SCIENCES & HUMANITIES',
  'ADVERTISING',
  'MARKET RESEARCH AND PUBLIC OPINION POLLING',
  'SPECIALIZED DESIGN ACTIVITIES',
  'PHOTOGRAPHIC ACTIVITIES',
  'OTHER PROFESSIONAL, SCIENTIFIC & TECHNICAL ACTS',
  'VETERINARY ACTIVITIES',
  'RENTING AND LEASING OF MOTOR VEHICLES',
  'RENTING/LEASING OF OTHER MACHINERY, EQUIPMENT',
  'LEASING OF NONFINANCIAL INTANGIBLE ASSETS',
  'ACTIVITIES OF EMPLOYMENT PLACEMENT AGENCIES',
  'TEMPORARY EMPLOYMENT AGENCY ACTIVITIES',
  'HUMAN RESOURCES PROVISION & MANAGEMENT THEREOF',
  'TRAVEL AGENCY AND TOUR OPERATOR ACTIVITIES',
  'OTHER RESERVATION SERVICE ACTIVITIES',
  'PRIVATE SECURITY ACTIVITIES',
  'SECURITY SYSTEMS SERVICE ACTIVITIES',
  'INVESTIGATION ACTIVITIES',
  'COMBINED FACILITIES SUPPORT ACTIVITIES',
  'CLEANING ACTIVITIES',
  'LANDSCAPE CARE AND MAINTENANCE SERVICE ACTIVITIES',
  'OFFICE ADMINISTRATIVE AND SUPPORT ACTIVITIES',
  'ACTIVITIES OF CALL CENTRES',
  'CONVENTION AND TRADE SHOW ORGANIZERS',
  'BUSINESS SUPPORT SERVICE ACTIVITIES N.E.C.',
  'ADMINISTRATION OF THE STATE,ECONOMIC/SOCIAL POLICY',
  'PROVISION OF SERVICES TO THE COMMUNITY AS A WHOLE',
  'COMPULSORY SOCIAL SECURITY ACTIVITIES',
  'PRIMARY EDUCATION',
  'SECONDARY EDUCATION',
  'HIGHER EDUCATION',
  'OTHER EDUCATION',
  'EDUCATIONAL SUPPORT SERVICES',
  'HOSPITAL ACTIVITIES',
  'MEDICAL AND DENTAL PRACTICE ACTIVITIES',
  'OTHER HUMAN HEALTH ACTIVITIES',
  'NURSING CARE FACILITIES',
  'RESIDENTIAL CARE ACTIVITIES FOR MENTAL RETARDATION',
  'RESIDENTIAL CARE ACTIVITIES FOR DISABLED/ELDERLY',
  'OTHER RESIDENTIAL CARE ACTIVITIES N.E.C.',
  'SOCIAL WORK ACTS W/O ACCOMM FOR DISABLED/ELDERLY',
  'OTHER SOCIAL WORK ACTIVITIES WITHOUT ACCOMMODATION',
  'ARTS AND ENTERTAINMENT ACTIVITIES',
  'MUSEUMS ACTS, HISTORICAL SITES, GARDENS, RESERVES',
  'GAMBLING AND BETTING ACTIVITIES',
  'SPORTS ACTIVITIES',
  'OTHER AMUSEMENT AND RECREATION ACTIVITIES',
  'ACTS OF BUSINESS, EMPLOYERS & PROF MEMBERSHIP ORGS',
  'ACTIVITIES OF TRADE UNIONS',
  'ACTIVITIES OF OTHER MEMBERSHIP ORGANIZATIONS',
  'OTHER SERVICE ACTIVITIES',
  'ACTS OF HOUSEHOLDS AS EMPLOYERS OF DOMESTIC PERS',
  'UNDIFFERENTIATED GOOD ACTIVITIES OF PVT HOUSEHOLDS',
  'UNDIFFERENTIATED SERVICE ACTIVITIES OF PVT H/HOLDS',
  'ACTIVITIES OF EXTRATERRITORIAL ORGANIZATION & BODY',
  'ELECTRIC POWER GENERATION, TRANSMISSION/DISTRIBUTI',
  'MANUFACTURE OF GAS; DISTRIBUTION OF GASEOUS FUELS',
  'STEAM AND AIR CONDITIONING SUPPLY',
].sort();

export const INDUSTRIES_LIST = ALL_INDUSTRY_LIST.map((v, index) => {
  return { id: index, name: v };
});

export type CONTACT_FREQUENCY =
  | 'Weekly'
  | 'Bi-weekly'
  | 'Monthly'
  | 'As and when';

export const ACTIVITY_ON_ACCOUNT = [
  {
    id: 'CASH_DEPOSITS',
    name: 'Cash Deposits',
  },
  {
    id: 'DEBIT_ORDERS',
    name: 'Debit Orders',
  },
  {
    id: 'ELECTRONIC_PAYMENTS',
    name: 'Electronic Payments',
  },
  {
    id: 'DIGITAL_PAYMENTS',
    name: 'Digital Payments',
  },
  {
    id: 'CHEQUE_PAYMENTS',
    name: 'Cheque Payments',
  },
];

export const CONTACT_FREQUENCY_LIST = [
  'Weekly',
  'Bi-weekly',
  'Monthly',
  'As and when',
];

export const CONTACT_MODE_LIST = [
  { contactMode: 'SMS' },
  { contactMode: 'Email' },
  { contactMode: 'Phone Call' },
  { contactMode: 'Customer Visit' },
].map((v) => v.contactMode);
