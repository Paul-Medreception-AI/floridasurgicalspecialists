export type ServiceDetail = {
  slug: string;
  title: string;
  heroImage: string;
  imageAlt: string;
  summary: string;
  conditions: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "gallbladder-liver-disease",
    title: "Gallbladder & Liver Disease",
    heroImage: "/images/gallbladder_anatomy.jpeg",
    imageAlt: "Gallbladder anatomy illustration",
    summary:
      "Robotic and laparoscopic approaches for complex biliary disease, gallbladder attacks, and hepatobiliary tumors.",
    conditions: [
      "Symptomatic Cholelithiasis (Gallstones)",
      "Biliary Colic",
      "Biliary Dyskinesia",
      "Cholecystitis",
      "Choledocholithiasis",
      "Gallstone Pancreatitis",
      "Gall Bladder Cancer",
    ],
  },
  {
    slug: "hernias",
    title: "Hernias",
    heroImage: "/images/hernia-repair.jpg",
    imageAlt: "Hernia repair",
    summary:
      "Robotic and minimally invasive hernia repair tailored to groin, ventral, incisional, and complex hiatal hernias.",
    conditions: [
      "Inguinal Hernia",
      "Umbilical Hernia",
      "Ventral Hernia",
      "Incisional Hernia",
      "Hiatal Hernia",
      "Parastomal Hernia",
      "Spigelian Hernia",
    ],
  },
  {
    slug: "colonoscopy-endoscopy",
    title: "Colonoscopy/Endoscopy",
    heroImage: "/images/colonoscopy.png",
    imageAlt: "Colonoscopy and endoscopy illustration",
    summary:
      "Diagnostic and therapeutic upper and lower endoscopy to investigate bleeding, reflux, dysphagia, weight loss, and screening needs.",
    conditions: [
      "Nausea / Vomiting",
      "Hemoptysis (throwing up blood)",
      "Abdominal Bloating",
      "Abdominal Pain",
      "Rectal Bleeding",
      "Rectal Pain",
      "Colon Polyps",
      "Iron Deficiency Anemia & Fatigue",
      "Difficulty Swallowing (Dysphagia)",
      "Heartburn & Acid Reflux",
      "Constipation",
      "Diarrhea",
      "Unintentional Weight Loss",
      "Change in Stool Caliber",
      "Incomplete Evacuation",
      "Positive Cologuard Test",
      "Positive FIT Test",
      "Positive Fecal Occult Blood Test (FOBT)",
    ],
  },
  {
    slug: "gastrointestinal-disorders",
    title: "Gastrointestinal Disorders",
    heroImage: "/images/GERD.webp",
    imageAlt: "Illustration of gastroesophageal reflux disease (GERD)",
    summary:
      "Medical and surgical care for inflammatory bowel disease, motility issues, reflux, and complex fistulas with enhanced recovery pathways.",
    conditions: [
      "Gastroesophageal Reflux Disease (GERD)",
      "Chronic Constipation",
      "Diarrhea",
      "Diverticulitis",
      "Colonic Stricture",
      "Bowel Obstruction",
      "Crohn's Disease",
      "Ulcerative Colitis",
      "Ischemic Colitis",
      "Irritable Bowel Syndrome (IBS)",
      "Inflammatory Bowel Disease (IBD)",
      "Small Intestinal Bacterial Overgrowth (SIBO)",
      "Colonic Inertia",
      "Gastroparesis",
      "Colovaginal and Rectovaginal Fistula",
      "Colovesical Fistula",
      "Enterocutaneous Fistula",
    ],
  },
  {
    slug: "hemorrhoids-anorectal-conditions",
    title: "Hemorrhoids & Anorectal Conditions",
    heroImage: "/images/anorectal.png",
    imageAlt: "Illustration of anorectal anatomy",
    summary:
      "Office and operative management of hemorrhoids, fissures, fistulas, and anorectal pain with a focus on fast relief.",
    conditions: [
      "Thrombosed Hemorrhoid",
      "Hemorrhoids",
      "Anal Fistula",
      "Anal Fissure",
      "Anal Condyloma - Laser Fulguration Procedure Offered",
      "Anal Intraepithelial Neoplasia (AIN)",
      "Peri-Rectal Abscess",
      "Peri-Anal Abscess",
      "Anal Cancer",
      "Anal Itching (Pruritis)",
      "Anal Pain",
      "Anal Stenosis",
      "Anal Stricture",
      "Rectal Pain",
      "Rectal Pressure",
      "Rectal Prolapse",
    ],
  },
  {
    slug: "skin-soft-tissue",
    title: "Skin & Soft Tissue",
    heroImage: "/images/skin-soft-tissue.jpeg",
    imageAlt: "Skin and soft tissue anatomy",
    summary:
      "Excision of skin cancers, cysts, and soft-tissue masses with attention to clear margins and cosmetic closure.",
    conditions: [
      "Melanoma",
      "Squamous Cell Carcinoma",
      "Basal Cell Carcinoma",
      "Epidermal Inclusion Cyst",
      "Pilonidal Cyst",
      "Lipoma",
      "Sebaceous (Simple) Cyst",
      "Non-Healing Wounds",
    ],
  },
  {
    slug: "colon-rectal-cancer",
    title: "Colon & Rectal Cancer",
    heroImage: "/images/colon-rectum.jpeg",
    imageAlt: "Colon and rectum anatomy",
    summary:
      "Minimally invasive staging, resection, and surveillance plans for cancers of the colon, rectum, and anus.",
    conditions: ["Colon Cancer", "Rectal Cancer", "Anal Cancer"],
  },
  {
    slug: "breast-disease",
    title: "Breast Disease",
    heroImage: "/images/breast-care.jpeg",
    imageAlt: "Breast care",
    summary:
      "Oncoplastic approaches, biopsies, and coordination with oncology partners for benign and malignant breast conditions.",
    conditions: ["Fibroadenoma", "Breast Cancer", "Ductal Hyperplasia", "Breast Abscess", "Breast Cyst"],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
