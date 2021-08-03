import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1627962393938 implements MigrationInterface {
    name = 'entities1627962393938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`nest-typeorm-graphql\`.\`user\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nest-typeorm-graphql\`.\`post\` (\`id\` char(36) NOT NULL, \`content\` varchar(255) NOT NULL, \`isPublished\` tinyint NOT NULL DEFAULT 1, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`nest-typeorm-graphql\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`DROP TABLE \`nest-typeorm-graphql\`.\`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`nest-typeorm-graphql\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`nest-typeorm-graphql\`.\`user\``);
    }

}
