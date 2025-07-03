-- CreateTable
CREATE TABLE "ProjectInquiry" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InquiryAnswer" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "inquiryId" TEXT NOT NULL,

    CONSTRAINT "InquiryAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InquiryAnswer" ADD CONSTRAINT "InquiryAnswer_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "ProjectInquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
