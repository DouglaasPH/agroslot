import { StyleSheet, useColorScheme } from "react-native";

export default function ThemedStyles() {

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f2e8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // cores do tema
    colorPrimary: {
      color: '#3d6b35',
    },
    colorPrimaryLight: {
      color: '#5a9e4a',
    },
    colorPrimaryDark: {
      color: '#2c4f27'
    },
    colorLeaf: {
      color: '#8ec63f',
    },
    colorSoil: {
      color: '#7a5230',
    },
    colorSoilLight: {
      color: '#b5845a',
    },
    colorSoilPale: {
      color: '#e8d5b7',
    },
    colorParchment: {
      color: '#f7f2e8',
    },
    colorWarning: {
      color: '#d97706',
    },
    colorDanger: {
      color: '#b91c1c',
    },
    colorHealthy: {
      color: '#16a34a',
    },
    colorGrass: {
      color: '#4a7c3f',
    },
    colorFence: {
      color: '#8b6241',
    },
    background: {
      backgroundColor: '#f7f2e8'
    },
    textColor: {
      color: '#1e2d1a',
    }
  });

  const stylesDark = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2b2b2b',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // cores do tema
    colorPrimary: {
      color: '#3d6b35',
    },
    colorPrimaryLight: {
      color: '#5a9e4a',
    },
    colorPrimaryDark: {
      color: '#2c4f27'
    },
    colorLeaf: {
      color: '#8ec63f'
    },
    colorSoil: {
      color: '#7a5230',
    },
    colorSoilLight: {
      color: '#b5845a',
    },
    colorSoilPale: {
      color: '#e8d5b7',
    },
    colorParchment: {
      color: '#f7f2e8',
    },
    colorWarning: {
      color: '#d97706',
    },
    colorDanger: {
      color: '#b91c1c',
    },
    colorHealthy: {
      color: '#16a34a',
    },
    colorGrass: {
      color: '#4a7c3f',
    },
    colorFence: {
      color: '#8b6241',
    }
  });

  if (colorScheme === 'dark') {
    return stylesDark
  } else if (colorScheme === 'light' || colorScheme === 'unspecified') {
    return styles
  }

}

export const Colors = {
  colorPrimary: {
    color: '#3d6b35',
  },
  colorPrimaryLight: {
    color: '#5a9e4a',
  },
  colorPrimaryDark: {
    color: '#2c4f27'
  },
  colorLeaf: {
    color: '#8ec63f',
  },
  colorSoil: {
    color: '#7a5230',
  },
  colorSoilLight: {
    color: '#b5845a',
  },
  colorSoilPale: {
    color: '#e8d5b7',
  },
  colorParchment: {
    color: '#f7f2e8',
  },
  colorWarning: {
    color: '#d97706',
  },
  colorDanger: {
    color: '#b91c1c',
  },
  colorHealthy: {
    color: '#16a34a',
  },
  colorGrass: {
    color: '#4a7c3f',
  },
  colorFence: {
    color: '#8b6241',
  },
  background: {
    backgroundColor: '#f7f2e8'
  },
  whiteBackground: {
    backgroundColor: '#ffffff',
  },
  textColor: {
    color: '#1e2d1a',
  },
  disabledGrayBackground: {
    color: '#8d8d8d'
  }
}