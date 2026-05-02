import { FormattedText } from "./style";

export const formatCodeText = (text: string) => {
  // Lista de palavras reservada para destacar
  const reservedWords = [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "import",
    "export",
    "APP_PORT",
    "PORT",
    "3000",
    "/",
    "process",
    "env",
    "http",
    "app",
    "message",
    "body",
    "json",
    "status",
    "ok",
    "get",
    "post",
    "put",
    "delete",
    "patch",
    "req",
    "res",
    "Java",
    "Spring Boot",
    "React",
    "Node",
    "Express",
    "Mongo",
    "Mongoose",
    "TypeScript",
    "Styled Components",
    "GitHub",
    "Code",
    "Git",
    "Repeat",
    "Break",
    "For",
    "While",
    "Do",
    "Switch",
    "Case",
    "Default",
    "Try",
    "Catch",
    "Finally",
    "Throw",
    "Fix",
    "Dev",
    "Programação",
    "Motivação",
    "Desenvolvimento",
    "Twitter",
    "API",
    "REST",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "ReactJS",
    "NextJS",
    "TailwindCSS",
    "MaterialUI",
    "Redux",
    "ReduxToolkit",
    "Jest",
  ];

  // Procura por essas palavras exatas em ordem crescente
  const regex = new RegExp(
    `\\b(${reservedWords.join("|")})\\b`,
    "g",
  );

  // Divide o texto em partes e aplica a formatação
  const parts = text.split(regex);

  return parts.map((part, index) =>
    reservedWords.includes(part) ? (
      <FormattedText key={index}>
        {part}
      </FormattedText>
    ) : (
      part
    ),
  );
};
