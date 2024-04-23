-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `relatedIssue` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_relatedIssue_fkey` FOREIGN KEY (`relatedIssue`) REFERENCES `Issue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
