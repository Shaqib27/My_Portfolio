export type CredentialDocument = {
  id: string;
  slug: string;
  title: string;
  actionLabel: string;
  filePath: string;
  educationId: "pg-dbda" | "btech" | "additional";
  subtitle?: string;
  issuer?: string;
};

export const credentialDocuments: CredentialDocument[] = [
  {
    id: "cdac-certificate",
    slug: "cdac-certificate",
    title: "PG-DBDA Certificate",
    actionLabel: "View Certificate",
    filePath: "documents/academic/CDAC_Certificate.pdf",
    educationId: "pg-dbda",
  },
  {
    id: "cdac-marksheet",
    slug: "cdac-marksheet",
    title: "PG-DBDA Marksheet",
    actionLabel: "View Marksheet",
    filePath: "documents/academic/Cdac_marksheet.pdf",
    educationId: "pg-dbda",
  },
  {
    id: "btech-provisional",
    slug: "btech-provisional",
    title: "B.Tech Provisional Certificate",
    actionLabel: "View Certificate",
    filePath: "documents/academic/Provisional Certificate.pdf",
    educationId: "btech",
  },
  {
    id: "excel-certificate",
    slug: "excel-certificate",
    title: "Excel Certification",
    actionLabel: "View Certificate",
    filePath: "documents/certifications/Advance_Excel_Certificate.pdf",
    educationId: "additional",
    subtitle: "Microsoft Excel Beginners To Advance",
    issuer: "Skill Course",
  },
];
