import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1627969586512 implements MigrationInterface {
    name = 'entities1627969586512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`nest-typeorm-graphql\`.\`user\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nest-typeorm-graphql\`.\`like\` (\`id\` char(36) NOT NULL, \`userId\` char(36) NULL, \`postId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nest-typeorm-graphql\`.\`post\` (\`id\` char(36) NOT NULL, \`content\` varchar(255) NOT NULL, \`isPublished\` tinyint NOT NULL DEFAULT 1, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`nest-typeorm-graphql\`.\`comment\` (\`id\` char(36) NOT NULL, \`content\` varchar(255) NOT NULL, \`authorId\` char(36) NULL, \`postId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`like\` ADD CONSTRAINT \`FK_e8fb739f08d47955a39850fac23\` FOREIGN KEY (\`userId\`) REFERENCES \`nest-typeorm-graphql\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`like\` ADD CONSTRAINT \`FK_3acf7c55c319c4000e8056c1279\` FOREIGN KEY (\`postId\`) REFERENCES \`nest-typeorm-graphql\`.\`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`nest-typeorm-graphql\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`comment\` ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`nest-typeorm-graphql\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`nest-typeorm-graphql\`.\`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\``);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`like\` DROP FOREIGN KEY \`FK_3acf7c55c319c4000e8056c1279\``);
        await queryRunner.query(`ALTER TABLE \`nest-typeorm-graphql\`.\`like\` DROP FOREIGN KEY \`FK_e8fb739f08d47955a39850fac23\``);
        await queryRunner.query(`DROP TABLE \`nest-typeorm-graphql\`.\`comment\``);
        await queryRunner.query(`DROP TABLE \`nest-typeorm-graphql\`.\`post\``);
        await queryRunner.query(`DROP TABLE \`nest-typeorm-graphql\`.\`like\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`nest-typeorm-graphql\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`nest-typeorm-graphql\`.\`user\``);
    }

}
