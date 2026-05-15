import { Project } from 'ts-morph';

const project = new Project({
  compilerOptions: {
    allowJs: true,
    skipLibCheck: true,
  },
  skipAddingFilesFromTsConfig: true,
});

export async function parseTypeScript(filePath: string) {
  return project.addSourceFileAtPath(filePath);
}
