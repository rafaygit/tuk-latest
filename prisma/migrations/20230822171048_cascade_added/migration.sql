-- DropForeignKey
ALTER TABLE "templateIntegrations" DROP CONSTRAINT "templateIntegrations_templateId_fkey";

-- AddForeignKey
ALTER TABLE "templateIntegrations" ADD CONSTRAINT "templateIntegrations_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
