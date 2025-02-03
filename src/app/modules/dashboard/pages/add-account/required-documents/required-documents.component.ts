import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-required-documents',
  templateUrl: './required-documents.component.html',
  styleUrls: ['./required-documents.component.scss'],
})
export class RequiredDocumentsComponent implements OnInit {
  @Output('navigation') navigation: EventEmitter<any> = new EventEmitter<any>();

  //    SOLE_PROPRITOR = "ca3bf42e-af1a-11ed-afa1-0242ac120002"
  //  LIMITED_LIABILITY = "ca3c06da-af1a-11ed-afa1-0242ac120002"
  //  PARTNERSHIPS = "ca3c0d1a-af1a-11ed-afa1-0242ac120002"
  //  EXTERNAL_COMPANY = "ca3c09c8-af1a-11ed-afa1-0242ac120002"
  //  NGOS_ACCOUNT = "ca3c14cc-af1a-11ed-afa1-0242ac120002"
  //  SCHOOL_ACCOUNT =  "ca3c129c-af1a-11ed-afa1-0242ac120002"

  assetUrl = environment.assetsUrl;
  panelExpanded = 0;
  normal: boolean = true;
  requirements: Array<any> = [
    {
      id: 'ca3c06da-af1a-11ed-afa1-0242ac120002',
      name: 'LIMITED LIABILITY',
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
    {
      name: 'PARTNERSHIP',
      id: 'ca3c0d1a-af1a-11ed-afa1-0242ac120002',
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
    {
      name: 'EXTERNAL COMPANIES',
      id: 'ca3c09c8-af1a-11ed-afa1-0242ac120002',
      data: [
        'Certificate of Registration',
        'Form 20',
        'Power of Attorney',
        'Board Resolution',
        'Mandate/Signature Card',
        'One Passport size photograph',
      ],
    },
    {
      name: 'SOLE PROPRIETORSHIP',
      id: 'ca3bf42e-af1a-11ed-afa1-0242ac120002',
      data: [
        'Only Ghana Card required for ID for Ghanaians.',
        'Proof of Business Location',
        'Proof of Residence of Proprietor/Executives/Directors/Signatories',
        'One Passport size photograph',
        'Bank Mandate Form',
        'Only passport are required for foreigners who do not reside in Ghana',
        'Passport, permit and non-citizen Ghana card are require for foreigners who resides in Ghana',
      ],
      'Specific Requirements': [
        'Certificate of Registration',
        'Form A',
        'Form D (any amendment to registration documents',
        'Annual renewal receipt',
      ],
      'Additional Requirement for Subsidiary Sole Proprietor': [
        'Registration Documents of Parent Company',
        'Form C',
      ],
    },
    {
      name: 'CLUBS, WELFARE, ASSOCIATIONS, NGOS',
      id: 'ca3c14cc-af1a-11ed-afa1-0242ac120002',
      data: [
        "National ID (Passport/Voters ID/Driver's License)",
        'Proof of Business Location',
        'Proof of Residence of Proprietor/Executives/Directors/Signatories',
        'One Passport size photograph',
        'Bank Mandate Form',
      ],
      'Specific Requirements': {
        'Limited by Guarantee - Registered': [
          'Certificate of Incorporation',
          'Certificate to Commence Business',
          'Regulations',
          'Form 3B',
        ],
        Unregistered: [
          'Constitution endorsed by Executives',
          'Resolution/Regulations',
          'Social Welfare Certificate (if applicable)',
        ],
      },
    },
    {
      name: 'SCHOOL',
      id: 'ca3c129c-af1a-11ed-afa1-0242ac120002',
      data: [
        "National ID (Passport/Voters ID/Driver's License)",
        'Proof of Business Location',
        'Proof of Residence of Proprietor/Executives/Directors/Signatories',
        'One Passport size photograph',
        'Bank Mandate Form',
      ],
      'Specific Requirements': [
        "Certificate of Registration from Registrar Generals' Dept.",
        'Certificate of Registration from Ghana Education Service',
        'Accreditation documents from the National Accreditation Board (applicable to Professional Bodies)',
        'Board Resolution',
        'Form 3B - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
        'Form C & Rgistration documents of Parent Company - Depending on the type of registration, the requirements for the entity would apply - whether a sole proprietorship, partnership or limited liability',
      ],
    },
  ];
  selectedEntity: any = {};

  @Input() selectedAccountId = '';
  constructor() {}

  ngOnInit(): void {
    this.checkEntity();
  }

  checkEntity(): void {
    this.selectedEntity = this.requirements.find(
      (data, pos) => data.id === this.selectedAccountId
    );
    //find the element by the id

    //use the id to render the element
    this.selectedEntity['Specific Requirements'] &&
    this.selectedEntity['Specific Requirements'].Unregistered
      ? (this.normal = false)
      : (this.normal = true);
  }
  navigate(event: string): void {
    this.navigation.emit(event);
  }
}
