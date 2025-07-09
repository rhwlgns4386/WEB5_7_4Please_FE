import { Shirt, Smartphone, Dumbbell, Sofa, Home, Package } from 'lucide-react';

interface ProductImagePlaceholderProps {
  category: string;
  isDark?: boolean;
}

const getCategoryIcon = (category: string) => {
  const icons = {
    패션: Shirt,
    전자제품: Smartphone,
    스포츠: Dumbbell,
    가구: Sofa,
    생활용품: Home,
    기타: Package,
  };

  return icons[category as keyof typeof icons] || Package;
};

const getCategoryColor = (category: string, isDark: boolean) => {
  const colors = {
    패션: isDark ? 'text-pink-400' : 'text-pink-500',
    전자제품: isDark ? 'text-blue-400' : 'text-blue-500',
    스포츠: isDark ? 'text-green-400' : 'text-green-500',
    가구: isDark ? 'text-amber-400' : 'text-amber-500',
    생활용품: isDark ? 'text-purple-400' : 'text-purple-500',
    기타: isDark ? 'text-gray-400' : 'text-gray-500',
  };

  return colors[category as keyof typeof colors] || colors['기타'];
};

export default function ProductImagePlaceholder({
  category,
  isDark = false,
}: ProductImagePlaceholderProps) {
  const IconComponent = getCategoryIcon(category);
  const iconColor = getCategoryColor(category, isDark);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${
        isDark
          ? 'bg-gradient-to-br from-gray-700 to-gray-800'
          : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}
    >
      <IconComponent size={48} className={`mb-2 ${iconColor}`} />
      <span
        className={`text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {category}
      </span>
      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        이미지 준비중
      </span>
    </div>
  );
}
