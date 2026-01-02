import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAdminUser1763519000000 implements MigrationInterface {
  name = 'SeedAdminUser1763519000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 👀 1. Verificamos si ya existe un usuario admin con este email
    const existingUsers = await queryRunner.query(
      `SELECT id FROM "users" WHERE email = $1 LIMIT 1`,
      ['admin@local.test'],
    );

    if (existingUsers.length > 0) {
      // Ya existe, no hacemos nada
      return;
    }

    // 👤 2. Creamos el perfil (profiles)
    const profileResult = await queryRunner.query(
      `INSERT INTO "profiles" ("name", "last_name", "created_at", "updated_at")
       VALUES ($1, $2, NOW(), NOW())
       RETURNING id`,
      ['Martha', 'Tambo'],
    );

    const profileId = profileResult[0].id as number;

    // 🔐 3. Password hasheado con bcrypt de:  Admin123!
    //    (cost = 10)
    const passwordHash =
      '$2b$10$au82N2NyU3q0M1FQwu6aKuIJ/svzJAEJDxMt2DzJVcH2eARza6FJu';

    // 👑 4. Insertamos el usuario admin
    await queryRunner.query(
      `INSERT INTO "users" ("email", "password", "role", "perfil_id", "created_at", "updated_at")
       VALUES ($1, $2, $3, $4, NOW(), NOW())`,
      ['admin@local.test', passwordHash, 'admin', profileId],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Borramos el usuario admin
    await queryRunner.query(
      `DELETE FROM "users" WHERE email = $1`,
      ['admin@local.test'],
    );

    // Borramos el perfil asociado (si quieres ser más específico)
    await queryRunner.query(
      `DELETE FROM "profiles"
       WHERE "name" = $1 AND "last_name" = $2`,
      ['Administrador', 'General'],
    );
  }
}
