-- DropForeignKey
ALTER TABLE "componentIntegrations" DROP CONSTRAINT "componentIntegrations_componentId_fkey";

-- DropForeignKey
ALTER TABLE "componentMetas" DROP CONSTRAINT "componentMetas_componentId_fkey";

-- AddForeignKey
ALTER TABLE "componentMetas" ADD CONSTRAINT "componentMetas_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "componentIntegrations" ADD CONSTRAINT "componentIntegrations_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "components"("id") ON DELETE CASCADE ON UPDATE CASCADE;
