-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Craft" (
    "id" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Craft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trigger" (
    "id" TEXT NOT NULL,
    "craftId" TEXT NOT NULL,
    "triggerId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL,
    "craftId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableAction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftRun" (
    "id" TEXT NOT NULL,
    "craftId" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "CraftRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CraftRunOutbox" (
    "id" TEXT NOT NULL,
    "craftRunId" TEXT NOT NULL,

    CONSTRAINT "CraftRunOutbox_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trigger_craftId_key" ON "Trigger"("craftId");

-- CreateIndex
CREATE UNIQUE INDEX "CraftRunOutbox_craftRunId_key" ON "CraftRunOutbox"("craftRunId");

-- AddForeignKey
ALTER TABLE "Craft" ADD CONSTRAINT "Craft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "AvailableAction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftRun" ADD CONSTRAINT "CraftRun_craftId_fkey" FOREIGN KEY ("craftId") REFERENCES "Craft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CraftRunOutbox" ADD CONSTRAINT "CraftRunOutbox_craftRunId_fkey" FOREIGN KEY ("craftRunId") REFERENCES "CraftRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
