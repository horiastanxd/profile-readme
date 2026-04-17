// Curated list of technologies for the profile picker.
// Slugs map to shields.io simple-icons logos. Colors are approximate brand hex.
window.STACK = [
  {
    group: 'Languages',
    items: [
      { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E', fg: 'black' },
      { name: 'TypeScript', slug: 'typescript', color: '3178C6', fg: 'white' },
      { name: 'Python', slug: 'python', color: '3776AB', fg: 'white' },
      { name: 'Rust', slug: 'rust', color: '000000', fg: 'white' },
      { name: 'Go', slug: 'go', color: '00ADD8', fg: 'white' },
      { name: 'Ruby', slug: 'ruby', color: 'CC342D', fg: 'white' },
      { name: 'Java', slug: 'openjdk', color: 'ED8B00', fg: 'white' },
      { name: 'Kotlin', slug: 'kotlin', color: '7F52FF', fg: 'white' },
      { name: 'Swift', slug: 'swift', color: 'F05138', fg: 'white' },
      { name: 'PHP', slug: 'php', color: '777BB4', fg: 'white' },
      { name: 'C', slug: 'c', color: 'A8B9CC', fg: 'black' },
      { name: 'C++', slug: 'cplusplus', color: '00599C', fg: 'white' },
      { name: 'C#', slug: 'csharp', color: '239120', fg: 'white' },
      { name: 'Elixir', slug: 'elixir', color: '4B275F', fg: 'white' },
      { name: 'Lua', slug: 'lua', color: '2C2D72', fg: 'white' }
    ]
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', slug: 'react', color: '20232A', fg: '61DAFB' },
      { name: 'Vue', slug: 'vuedotjs', color: '4FC08D', fg: 'white' },
      { name: 'Svelte', slug: 'svelte', color: 'FF3E00', fg: 'white' },
      { name: 'Angular', slug: 'angular', color: 'DD0031', fg: 'white' },
      { name: 'Solid', slug: 'solid', color: '2C4F7C', fg: 'white' },
      { name: 'Next.js', slug: 'nextdotjs', color: '000000', fg: 'white' },
      { name: 'Nuxt', slug: 'nuxtdotjs', color: '00DC82', fg: 'black' },
      { name: 'Astro', slug: 'astro', color: '0C1222', fg: 'white' },
      { name: 'Remix', slug: 'remix', color: '000000', fg: 'white' },
      { name: 'Tailwind', slug: 'tailwindcss', color: '06B6D4', fg: 'white' },
      { name: 'HTML', slug: 'html5', color: 'E34F26', fg: 'white' },
      { name: 'CSS', slug: 'css3', color: '1572B6', fg: 'white' },
      { name: 'Sass', slug: 'sass', color: 'CC6699', fg: 'white' }
    ]
  },
  {
    group: 'Backend',
    items: [
      { name: 'Node.js', slug: 'nodedotjs', color: '339933', fg: 'white' },
      { name: 'Deno', slug: 'deno', color: '000000', fg: 'white' },
      { name: 'Bun', slug: 'bun', color: 'FBF0DF', fg: 'black' },
      { name: 'Express', slug: 'express', color: '000000', fg: 'white' },
      { name: 'NestJS', slug: 'nestjs', color: 'E0234E', fg: 'white' },
      { name: 'FastAPI', slug: 'fastapi', color: '009688', fg: 'white' },
      { name: 'Django', slug: 'django', color: '092E20', fg: 'white' },
      { name: 'Flask', slug: 'flask', color: '000000', fg: 'white' },
      { name: 'Rails', slug: 'rubyonrails', color: 'CC0000', fg: 'white' },
      { name: 'Spring', slug: 'spring', color: '6DB33F', fg: 'white' },
      { name: 'Laravel', slug: 'laravel', color: 'FF2D20', fg: 'white' },
      { name: 'GraphQL', slug: 'graphql', color: 'E10098', fg: 'white' }
    ]
  },
  {
    group: 'Mobile',
    items: [
      { name: 'React Native', slug: 'react', color: '20232A', fg: '61DAFB' },
      { name: 'Flutter', slug: 'flutter', color: '02569B', fg: 'white' },
      { name: 'SwiftUI', slug: 'swift', color: 'F05138', fg: 'white' },
      { name: 'Jetpack Compose', slug: 'jetpackcompose', color: '4285F4', fg: 'white' }
    ]
  },
  {
    group: 'Data',
    items: [
      { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1', fg: 'white' },
      { name: 'MySQL', slug: 'mysql', color: '4479A1', fg: 'white' },
      { name: 'SQLite', slug: 'sqlite', color: '003B57', fg: 'white' },
      { name: 'MongoDB', slug: 'mongodb', color: '47A248', fg: 'white' },
      { name: 'Redis', slug: 'redis', color: 'DC382D', fg: 'white' },
      { name: 'Supabase', slug: 'supabase', color: '3ECF8E', fg: 'white' },
      { name: 'Firebase', slug: 'firebase', color: 'DD2C00', fg: 'white' },
      { name: 'Prisma', slug: 'prisma', color: '2D3748', fg: 'white' },
      { name: 'DuckDB', slug: 'duckdb', color: 'FFF000', fg: 'black' }
    ]
  },
  {
    group: 'Cloud & DevOps',
    items: [
      { name: 'AWS', slug: 'amazonaws', color: '232F3E', fg: 'white' },
      { name: 'GCP', slug: 'googlecloud', color: '4285F4', fg: 'white' },
      { name: 'Azure', slug: 'microsoftazure', color: '0078D4', fg: 'white' },
      { name: 'Vercel', slug: 'vercel', color: '000000', fg: 'white' },
      { name: 'Netlify', slug: 'netlify', color: '00C7B7', fg: 'white' },
      { name: 'Cloudflare', slug: 'cloudflare', color: 'F38020', fg: 'white' },
      { name: 'Docker', slug: 'docker', color: '2496ED', fg: 'white' },
      { name: 'Kubernetes', slug: 'kubernetes', color: '326CE5', fg: 'white' },
      { name: 'Terraform', slug: 'terraform', color: '7B42BC', fg: 'white' },
      { name: 'GitHub Actions', slug: 'githubactions', color: '2088FF', fg: 'white' }
    ]
  },
  {
    group: 'Tools',
    items: [
      { name: 'Git', slug: 'git', color: 'F05032', fg: 'white' },
      { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC', fg: 'white' },
      { name: 'Neovim', slug: 'neovim', color: '57A143', fg: 'white' },
      { name: 'Vim', slug: 'vim', color: '019733', fg: 'white' },
      { name: 'Linux', slug: 'linux', color: 'FCC624', fg: 'black' },
      { name: 'macOS', slug: 'apple', color: '000000', fg: 'white' },
      { name: 'Figma', slug: 'figma', color: 'F24E1E', fg: 'white' },
      { name: 'Notion', slug: 'notion', color: '000000', fg: 'white' }
    ]
  }
];
