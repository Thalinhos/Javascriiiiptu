-- --------------------------------------------------------
-- Servidor:                     C:\Users\Thalisson\Desktop\bun\prisma\dev.db
-- Versão do servidor:           3.45.3
-- OS do Servidor:               
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela dev.Todos
CREATE TABLE IF NOT EXISTS "Todos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "todo" TEXT NOT NULL
);

-- Copiando dados para a tabela dev.Todos: -1 rows
/*!40000 ALTER TABLE "Todos" DISABLE KEYS */;
INSERT INTO "Todos" ("id", "todo") VALUES
	(1, 'codar em js'),
	(2, 'teste'),
	(3, 'vamo timeee'),
	(4, 'vamo vamo');
/*!40000 ALTER TABLE "Todos" ENABLE KEYS */;

-- Copiando estrutura para tabela dev.User
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- Copiando dados para a tabela dev.User: -1 rows
/*!40000 ALTER TABLE "User" DISABLE KEYS */;
INSERT INTO "User" ("id", "username", "password") VALUES
	(1, 'thalisson', 'f8a7199dae4beccbe646b14292ddbbb44d1531875e5ff7e2677a3b5ed1d7bf94');
/*!40000 ALTER TABLE "User" ENABLE KEYS */;

-- Copiando estrutura para tabela dev._prisma_migrations
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);

-- Copiando dados para a tabela dev._prisma_migrations: -1 rows
/*!40000 ALTER TABLE "_prisma_migrations" DISABLE KEYS */;
INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
	('795ffecd-ae0e-4755-be69-80f9c72c0aa9', '952d6dc8372446546e68078904810105bfa6a47611b8c2d3f9b5c33d2fdac4d7', '1721665692121', '20240722162812_init', NULL, NULL, '1721665692099', 1),
	('b672348c-e3a5-4b9e-a8fd-cb854d217d6b', '68b413b8401340879cc0235eebc66e52b01f880ef08dc1ab76277fa2c4286f0e', '1721665856075', '20240722163056_parte_2', NULL, NULL, '1721665856056', 1);
/*!40000 ALTER TABLE "_prisma_migrations" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
