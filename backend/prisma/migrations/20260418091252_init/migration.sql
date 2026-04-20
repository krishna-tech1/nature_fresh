-- CreateTable
CREATE TABLE "Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "mainHeadline" TEXT NOT NULL DEFAULT 'Nature Fresh Foods: Global Excellence in Export',
    "heroNarrative" TEXT NOT NULL DEFAULT 'We bridge the gap between local sustainable farms and the global market...',
    "companyStory" TEXT NOT NULL DEFAULT 'Founded in the heart of fertile valleys...',
    "missionStatement" TEXT NOT NULL DEFAULT 'Our mission is to foster a sustainable global food system...',
    "yearsOfExperience" INTEGER NOT NULL DEFAULT 24,
    "countriesServed" INTEGER NOT NULL DEFAULT 142,
    "tonnageExported" INTEGER NOT NULL DEFAULT 850,
    "heroAssetUrl" TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_email_key" ON "TeamMember"("email");
