-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "DiagnosticRunStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "AnonSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthState" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    "state" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "OAuthState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "XeroConnection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,
    "tenantName" TEXT,
    "accessTokenEncrypted" TEXT NOT NULL,
    "refreshTokenEncrypted" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "XeroConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticRun" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "status" "DiagnosticRunStatus" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "diagnosticVersion" TEXT NOT NULL DEFAULT 'v1',
    "tenantId" TEXT NOT NULL,
    "tenantName" TEXT,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "DiagnosticRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosticResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overallScore" INTEGER NOT NULL,
    "dimensionsJson" JSONB NOT NULL,
    "findingsJson" JSONB NOT NULL,
    "runId" TEXT NOT NULL,

    CONSTRAINT "DiagnosticResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "company" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "runId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AnonSession_lastSeenAt_idx" ON "AnonSession"("lastSeenAt");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthState_state_key" ON "OAuthState"("state");

-- CreateIndex
CREATE INDEX "OAuthState_sessionId_idx" ON "OAuthState"("sessionId");

-- CreateIndex
CREATE INDEX "XeroConnection_sessionId_idx" ON "XeroConnection"("sessionId");

-- CreateIndex
CREATE INDEX "XeroConnection_tenantId_idx" ON "XeroConnection"("tenantId");

-- CreateIndex
CREATE INDEX "DiagnosticRun_sessionId_idx" ON "DiagnosticRun"("sessionId");

-- CreateIndex
CREATE INDEX "DiagnosticRun_tenantId_idx" ON "DiagnosticRun"("tenantId");

-- CreateIndex
CREATE INDEX "DiagnosticRun_createdAt_idx" ON "DiagnosticRun"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DiagnosticResult_runId_key" ON "DiagnosticResult"("runId");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_runId_idx" ON "Lead"("runId");

-- CreateIndex
CREATE INDEX "Lead_sessionId_idx" ON "Lead"("sessionId");

-- AddForeignKey
ALTER TABLE "OAuthState" ADD CONSTRAINT "OAuthState_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AnonSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XeroConnection" ADD CONSTRAINT "XeroConnection_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AnonSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticRun" ADD CONSTRAINT "DiagnosticRun_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AnonSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosticResult" ADD CONSTRAINT "DiagnosticResult_runId_fkey" FOREIGN KEY ("runId") REFERENCES "DiagnosticRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_runId_fkey" FOREIGN KEY ("runId") REFERENCES "DiagnosticRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AnonSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

