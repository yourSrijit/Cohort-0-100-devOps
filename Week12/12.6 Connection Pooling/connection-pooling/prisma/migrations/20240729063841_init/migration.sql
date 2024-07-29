-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "roll" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "class" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
